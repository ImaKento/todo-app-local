package todo

import (
	"fmt"
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
)

type SearchTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

func NewSearchTodoUseCase(todoRepo repository.ITodoRepository) *SearchTodoUseCase {
	return &SearchTodoUseCase{todoRepo}
}

func (usecase *SearchTodoUseCase) Execute(input value_object.SearchTodoParams) ([]entity.Todo, error) {
	// 条件に応じ、todoを取得
	findTodos, err := usecase.todoRepo.Search(input)
	if err != nil {
		return nil, fmt.Errorf("falied to find tody: %w", err)
	}
	if findTodos == nil {
		return nil, customerror.NewNotFoundError("todos not found")
	}

	return findTodos, nil
}
