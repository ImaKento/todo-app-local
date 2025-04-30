package response

import (
	"go-todo-app/domain/entity"
	"time"
)

type UserDTO struct {
	ID             string    `json:"id"`
	Email          string    `json:"email"`
	HashedPassword string    `json:"hashed_password"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func ToResponseUserDTO(user *entity.User) *UserDTO {
	return &UserDTO{
		ID:             user.Id().Value(),
		Email:          user.Email().Value(),
		HashedPassword: user.HashedPassword().Value(),
		CreatedAt:      user.CreatedAt(),
		UpdatedAt:      user.UpdatedAt(),
	}
}
