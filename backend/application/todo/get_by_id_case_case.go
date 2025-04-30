package todo

import (
	"fmt"
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
)

type GetTodoByIdUseCase struct {
	todoRepo repository.ITodoRepository
}

func NewGetTodoByIdUseCase(todoRepo repository.ITodoRepository) *GetTodoByIdUseCase {
	return &GetTodoByIdUseCase{todoRepo}
}

func (usecase *GetTodoByIdUseCase) Execute(todoId value_object.TodoId, userId value_object.UserId) (*entity.Todo, error) {
	// todoIDからtodoを取得
	findTodo, err := usecase.todoRepo.FindById(todoId)
	if err != nil {
		return nil, fmt.Errorf("failed to find todo by id: %w", err)
	}
	if findTodo == nil {
		return nil, customerror.NewNotFoundError("todo not found")
	}

	// todoがユーザ自身のものか確認
	if findTodo.UserId() != userId {
		return nil, customerror.NewUnauthorizedError("cannot update another user's todo")
	}

	return findTodo, nil
}
