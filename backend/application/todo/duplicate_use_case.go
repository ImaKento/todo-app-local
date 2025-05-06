package todo

import (
	"fmt"
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"time"
)

type DuplicateTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

func NewDuplicateTodoUseCase(todoRepo repository.ITodoRepository) *DuplicateTodoUseCase {
	return &DuplicateTodoUseCase{todoRepo}
}

func (usecase *DuplicateTodoUseCase) Execute(todoId value_object.TodoId, userId value_object.UserId) (*entity.Todo, error) {
	// TodoをIDで取得
	todo, err := usecase.todoRepo.FindById(todoId)
	if err != nil {
		return nil, err
	}
	if todo == nil {
		return nil, customerror.NewNotFoundError("todo not found")
	}

	// 自身のtodoかチェック
	if todo.UserId() != userId {
		return nil, customerror.NewUnauthorizedError("unauthorized: cannot duplicate another user's todo")
	}

	// Todoを複製
	titleStr := todo.Title().Value()
	if len(titleStr) > 95 {
		titleStr = titleStr[:95]
	}
	newTitle := titleStr + "のコピー"
	newTitleVo, err := value_object.NewTitle(newTitle)
	if err != nil {
		return nil, err
	}
	duplicatedEntity := entity.NewTodo(
		value_object.NewTodoId(),
		userId,
		newTitleVo,
		todo.Body(),
		todo.Status(),
		nil,
		nil,
		time.Now(),
		time.Now(),
	)

	// 作成したTodoエンティティを保存
	duplicatedTodo, err := usecase.todoRepo.Save(&duplicatedEntity)
	if err != nil {
		return nil, fmt.Errorf("failed to duplicate todo: %w", err)
	}
	return duplicatedTodo, nil
}
