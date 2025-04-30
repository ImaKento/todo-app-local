package repository

import (
	"go-todo-app/domain/entity"
	value_object "go-todo-app/domain/value-object"
)

type IUserRepository interface {
	FindByEmail(email value_object.Email) (*entity.User, error)
	Save(user *entity.User) (*entity.User, error)
}
