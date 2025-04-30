package repository

import (
	"go-todo-app/domain/entity"
	value_object "go-todo-app/domain/value-object"
)

type ITodoRepository interface {
	FindById(todoId value_object.TodoId) (*entity.Todo, error)
	Search(params value_object.SearchTodoParams) ([]entity.Todo, error)
	Save(todo *entity.Todo) (*entity.Todo, error)
	Update(todo *entity.Todo) (*entity.Todo, error)
	Delete(todoId value_object.TodoId) error
}
