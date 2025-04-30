package todo

import (
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
)

type DeleteTodoUseCase struct {
	todoRepo repository.ITodoRepository
}

func NewDeleteTodoUseCase(todoRepo repository.ITodoRepository) *DeleteTodoUseCase {
	return &DeleteTodoUseCase{todoRepo}
}

func (usecase *DeleteTodoUseCase) Execute(todoId value_object.TodoId, userId value_object.UserId) error {
	// TodoをIDで取得
	todo, err := usecase.todoRepo.FindById(todoId)
	if err != nil {
		return err
	}
	if todo == nil {
		return customerror.NewNotFoundError("todo not found")
	}

	// 自身のtodoかチェック
	if todo.UserId() != userId {
		return customerror.NewUnauthorizedError("unauthorized: cannot delete another user's todo")
	}

	// Todoを削除
	if err := usecase.todoRepo.Delete(todoId); err != nil {
		return err
	}

	return nil
}
