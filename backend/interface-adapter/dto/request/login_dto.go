package request

import (
	"go-todo-app/application/user"
	value_object "go-todo-app/domain/value-object"
)

// Login用のDTOと変換処理
type LoginDTO struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func (dto *LoginDTO) ToInput() (*user.LoginParams, error) {
	email, err := value_object.NewEmail(dto.Email)
	if err != nil {
		return nil, err
	}

	return &user.LoginParams{
		Email:       email,
		RawPassword: dto.Password,
	}, nil
}
