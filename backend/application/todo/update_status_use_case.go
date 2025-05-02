package todo

import (
	"fmt"
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
)

type UpdateStatusTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

func NewUpdateStatusTodoUseCase(todoRepo repository.ITodoRepository) *UpdateStatusTodoUseCase {
	return &UpdateStatusTodoUseCase{todoRepo}
}

func (usecase *UpdateStatusTodoUseCase) Execute(todoId value_object.TodoId, userId value_object.UserId, status value_object.Status) (*entity.Todo, error) {
	// todoIdからtodoを取得
	todo, err := usecase.todoRepo.FindById(todoId)
	if err != nil {
		return nil, err
	}
	if todo == nil {
		return nil, customerror.NewNotFoundError("todo not found")
	}

	// todoがユーザ自身のものか確認
	if todo.UserId() != userId {
		return nil, customerror.NewUnauthorizedError("cannot update another user's todo")
	}

	// Statusを更新
	todo.SetStatus(status)

	// updateAtを現在時間に更新
	todo.UpdateTimestamp()

	// エンティティを更新
	updatedTodo, err := usecase.todoRepo.Update(todo)
	if err != nil {
		return nil, fmt.Errorf("failed to update todo: %w", err)
	}
	return updatedTodo, nil
}
