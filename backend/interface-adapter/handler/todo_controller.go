package handler

import (
	"go-todo-app/application/todo"
	value_object "go-todo-app/domain/value-object"
	"go-todo-app/interface-adapter/dto/request"
	"go-todo-app/interface-adapter/dto/response"
	"net/http"

	"github.com/labstack/echo/v4"
)

type TodoController struct {
	gu  *todo.GetTodoByIdUseCase
	su  *todo.SearchTodoUseCase
	cu  *todo.CreateTodoUseCase
	uu  *todo.UpdateTodoUseCase
	dup *todo.DuplicateTodoUseCase
	du  *todo.DeleteTodoUseCase
}

func NewTodoController(
	gu *todo.GetTodoByIdUseCase,
	su *todo.SearchTodoUseCase,
	cu *todo.CreateTodoUseCase,
	uu *todo.UpdateTodoUseCase,
	dup *todo.DuplicateTodoUseCase,
	du *todo.DeleteTodoUseCase,
) *TodoController {
	return &TodoController{gu, su, cu, uu, dup, du}
}

// GetByIdはIDからTodoを取得する
func (tc *TodoController) GetById(ctx echo.Context) error {
	// パラメータからIDを取得
	idParam := ctx.Param("id")
	// value-objectでバリデーション後、usecase用に変換
	todoId, err := value_object.FromStringTodoId(idParam)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	// value-objectでバリデーション後、usecase用に変換
	userId, err := value_object.FromStringUserId(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	findTodo, err := tc.gu.Execute(todoId, userId)
	if err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Entity → DTOに変換する
	res := response.ToResponseTodoDTO(findTodo)
	return ctx.JSON(http.StatusOK, res)
}

// Searchはrequest内容での検索、また一覧の取得を行う
func (tc *TodoController) Search(ctx echo.Context) error {
	// クエリパラメータを取得
	title := ctx.QueryParam("title")
	body := ctx.QueryParam("body")
	status := ctx.QueryParam("status")
	dueFrom := ctx.QueryParam("due_from")
	dueTo := ctx.QueryParam("due_to")
	completed := ctx.QueryParam("completed")

	// requestをDTOでバインドする
	searchDTO := request.SearchTodoDTO{
		Title:     &title,
		Body:      &body,
		Status:    &status,
		DueFrom:   &dueFrom,
		DueTo:     &dueTo,
		Completed: &completed,
	}

	// DTO → usecase用のInput構造体に変換
	input, err := searchDTO.ToInput(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	todos, err := tc.su.Execute(*input)
	if err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	var res []*response.TodoDTO
	for _, todo := range todos {
		res = append(res, response.ToResponseTodoDTO(&todo))
	}

	return ctx.JSON(http.StatusOK, res)
}

// CreateはTodoを作成する
func (tc *TodoController) Create(ctx echo.Context) error {
	// requestをDTOでバインドする
	var todoDTO request.CreateTodoDTO
	if err := ctx.Bind(&todoDTO); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// DTO → usecase用のInput構造体に変換
	input, err := todoDTO.ToInput(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	createdTodo, err := tc.cu.Execute(*input)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Entity → DTOに変換する
	res := response.ToResponseTodoDTO(createdTodo)
	return ctx.JSON(http.StatusCreated, res)
}

// UpdateはTodoを更新する
func (tc *TodoController) Update(ctx echo.Context) error {
	// パラメータからIDを取得
	idParam := ctx.Param("id")
	// value-objectでバリデーション後、usecase用に変換
	todoId, err := value_object.FromStringTodoId(idParam)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// value-ojbectでバリデーション後、usecase用に変換
	userId, err := value_object.FromStringUserId(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// requestをDTOでバインドする
	var todoDTO request.UpdateTodoDTO
	if err := ctx.Bind(&todoDTO); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// DTO → usecase用のInput構造体に変換
	input, err := todoDTO.ToInput()
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	updatedTodo, err := tc.uu.Execute(todoId, userId, *input)
	if err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Entity → DTOに変換する
	res := response.ToResponseTodoDTO(updatedTodo)
	return ctx.JSON(http.StatusOK, res)
}

// DuplicateはTodoを複製する
func (tc *TodoController) Duplicate(ctx echo.Context) error {
	// パラメータからIDを取得
	idParam := ctx.Param("id")
	// value-objectでバリデーション後、usecase用に変換
	todoId, err := value_object.FromStringTodoId(idParam)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// value-objectでバリデーション後、usecase用に変換
	userId, err := value_object.FromStringUserId(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	duplicatedTodo, err := tc.dup.Execute(todoId, userId)
	if err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Entity → DTOに変換する
	res := response.ToResponseTodoDTO(duplicatedTodo)
	return ctx.JSON(http.StatusCreated, res)
}

// DeleteはTodoを削除する
func (tc *TodoController) Delete(ctx echo.Context) error {
	// パラメータからIDを取得
	idParam := ctx.Param("id")
	// value-objectでバリデーション後、usecase用に変換
	todoId, err := value_object.FromStringTodoId(idParam)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// value-objectでバリデーション後、usecase用に変換
	userId, err := value_object.FromStringUserId(ctx.Get("user_id").(string))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	if err := tc.du.Execute(todoId, userId); err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}
