package repository

import (
	"encoding/json"
	"errors"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"go-todo-app/infrastructure/model"
	"time"

	"github.com/supabase-community/postgrest-go"
	"github.com/supabase-community/supabase-go"
)

type TodoRepository struct {
	Client *supabase.Client
}

func NewTodoRepository(client *supabase.Client) repository.ITodoRepository {
	return &TodoRepository{Client: client}
}

// IDからTodoを取得する
func (repo *TodoRepository) FindById(todoId value_object.TodoId) (*entity.Todo, error) {
	// データ取得
	data, _, err := repo.Client.From("todos").Select("*", "", false).Eq("id", todoId.Value()).Execute()
	if err != nil {
		return nil, err
	}

	// JSON -> model.Todo配列に変換
	var todos []model.Todo
	if err := json.Unmarshal(data, &todos); err != nil {
		return nil, err
	}
	if len(todos) == 0 {
		return nil, nil
	}

	// model → entityに変換
	todo := todoModelToEntity(todos[0])
	return &todo, nil
}

// Todoの検索、一覧取得
func (repo *TodoRepository) Search(params value_object.SearchTodoParams) ([]entity.Todo, error) {
	query := repo.Client.From("todos").Select("*", "", false)

	// ユーザIDで絞り込み
	userId := params.UserId
	query = query.Eq("user_id", userId.Value())

	// 条件がある場合、動的にwhereを追加
	if params.Title != nil {
		query = query.Like("title", "%"+params.Title.Value()+"%")
	}
	if params.Body != nil {
		query = query.Like("body", "%"+params.Body.Value()+"%")
	}
	if params.Status != nil {
		query = query.Eq("status", params.Status.Value())
	}
	if params.DueFrom != nil {
		query = query.Gte("due_date", params.DueFrom.Value().Format("2006-01-02"))
	}
	if params.DueTo != nil {
		query = query.Lte("due_date", params.DueTo.Value().Format("2006-01-02"))
	}
	if params.Completed != nil {
		if *params.Completed {
			query = query.Not("completed_at", "is", "null")
		} else {
			query = query.Is("completed_at", "null")
		}
	}

	// created_atで並び替え
	query = query.Order("created_at", &postgrest.OrderOpts{Ascending: false})

	// クエリを実行
	data, _, err := query.Execute()
	if err != nil {
		return nil, err
	}

	// JSON → model.Todo配列に変換
	var todos []model.Todo
	if err := json.Unmarshal(data, &todos); err != nil {
		return nil, err
	}

	// model → entityに変換
	var result []entity.Todo
	for _, m := range todos {
		result = append(result, todoModelToEntity(m))
	}
	return result, nil
}

// Todoの作成
func (repo *TodoRepository) Save(todo *entity.Todo) (*entity.Todo, error) {
	// entity → modelに変換
	todoModel := todoEntityToModel(*todo)

	// データを挿入
	data, _, err := repo.Client.From("todos").Insert(todoModel, false, "", "", "").Execute()
	if err != nil {
		return nil, err
	}

	// JSON -> model.Todo配列に変換
	var todos []model.Todo
	if err := json.Unmarshal(data, &todos); err != nil {
		return nil, err
	}
	if len(todos) == 0 {
		return nil, errors.New("create todo failed")
	}

	// model → entityに変換
	todoEntity := todoModelToEntity(todos[0])
	return &todoEntity, nil
}

// Todoの更新
func (repo *TodoRepository) Update(todo *entity.Todo) (*entity.Todo, error) {
	// entity → modelに変換
	todoModel := todoEntityToModel(*todo)

	// データ更新
	data, _, err := repo.Client.From("todos").Update(todoModel, "", "").Eq("id", todoModel.ID).Execute()
	if err != nil {
		return nil, err
	}

	// JSON -> model.Todo配列に変換
	var todos []model.Todo
	if err := json.Unmarshal(data, &todos); err != nil {
		return nil, err
	}
	if len(todos) == 0 {
		return nil, errors.New("update todo failed")
	}

	// model -> entityに変換
	todoEntity := todoModelToEntity(todos[0])
	return &todoEntity, nil
}

// Todoの削除
func (repo *TodoRepository) Delete(todoId value_object.TodoId) error {
	// データ削除
	_, _, err := repo.Client.From("todos").Delete("", "").Eq("id", todoId.Value()).Execute()
	if err != nil {
		return err
	}

	return nil
}

// entity.Todo型をmodel.Todo型に変換
func todoEntityToModel(todo entity.Todo) *model.Todo {
	id := todo.Id().Value()
	userId := todo.UserId().Value()
	title := todo.Title().Value()
	var body *string
	if todo.Body() != nil {
		b := todo.Body().Value()
		body = &b
	}
	status := todo.Status().Value()
	var dueDate *time.Time
	if todo.DueDate() != nil {
		d := todo.DueDate().Value()
		dueDate = &d
	}
	var completedAt *time.Time
	if todo.CompletedAt() != nil {
		c := todo.CompletedAt().Value()
		completedAt = &c
	}

	return &model.Todo{
		ID:          id,
		UserId:      userId,
		Title:       title,
		Body:        body,
		Status:      status,
		DueDate:     dueDate,
		CompletedAt: completedAt,
		CreatedAt:   todo.CreatedAt(),
		UpdatedAt:   todo.UpdatedAt(),
	}
}

// model.Todo型をentity.Todo型に変換
func todoModelToEntity(todo model.Todo) entity.Todo {
	id, _ := value_object.FromStringTodoId(todo.ID)
	userId, _ := value_object.FromStringUserId(todo.UserId)
	title, _ := value_object.NewTitle(todo.Title)
	var body *value_object.Body
	if todo.Body != nil {
		body, _ = value_object.NewBody(*todo.Body)
	}
	status, _ := value_object.NewStatus(todo.Status)
	var dueDate *value_object.DueDate
	if todo.DueDate != nil {
		dueDate, _ = value_object.NewDueDate(*todo.DueDate)
	}
	var completedAt *value_object.CompletedAt
	if todo.CompletedAt != nil {
		completedAt, _ = value_object.NewCompletedAt(*todo.CompletedAt)
	}

	return entity.NewTodo(
		id,
		userId,
		title,
		body,
		status,
		dueDate,
		completedAt,
		todo.CreatedAt,
		todo.UpdatedAt,
	)
}
