package todo

import (
	"fmt"
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
)

type UpdateTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

type UpdateTodoParams struct {
	Title       *value_object.Title
	Body        *value_object.Body
	Status      *value_object.Status
	DueDate     *value_object.DueDate
	CompletedAt *value_object.CompletedAt
}

func NewUpdateTodoUseCase(todoRepo repository.ITodoRepository) *UpdateTodoUseCase {
	return &UpdateTodoUseCase{todoRepo}
}

func (usecase *UpdateTodoUseCase) Execute(todoId value_object.TodoId, userId value_object.UserId, input UpdateTodoParams) (*entity.Todo, error) {
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

	// 各値を更新
	if input.Title != nil {
		todo.SetTitle(*input.Title)
	}
	if input.Body != nil {
		todo.SetBody(input.Body)
	}
	if input.Status != nil {
		todo.SetStatus(*input.Status)
	}
	todo.SetDueDate(input.DueDate)
	todo.SetCompletedAt(input.CompletedAt)

	// updateAtを現在時間に更新
	todo.UpdateTimestamp()

	// エンティティを更新
	updatedTodo, err := usecase.todoRepo.Update(todo)
	if err != nil {
		return nil, fmt.Errorf("failed to update todo: %w", err)
	}
	return updatedTodo, nil
}
