package todo

import (
	"fmt"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"time"
)

type CreateTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

type CreateTodoParams struct {
	UserId      value_object.UserId
	Title       value_object.Title
	Body        *value_object.Body
	Status      value_object.Status
	DueDate     *value_object.DueDate
	CompletedAt *value_object.CompletedAt
}

func NewCreateTodoUseCase(todoRepo repository.ITodoRepository) *CreateTodoUseCase {
	return &CreateTodoUseCase{todoRepo}
}

func (usecase *CreateTodoUseCase) Execute(input CreateTodoParams) (*entity.Todo, error) {
	// Todoエンティティを作成
	todoEntity := entity.NewTodo(
		value_object.NewTodoId(),
		input.UserId,
		input.Title,
		input.Body,
		input.Status,
		input.DueDate,
		input.CompletedAt,
		time.Now(),
		time.Now(),
	)

	// 作成したTodoエンティティを保存
	newTodo, err := usecase.todoRepo.Save(&todoEntity)
	if err != nil {
		return nil, fmt.Errorf("failed to create todo: %w", err)
	}
	return newTodo, nil
}
