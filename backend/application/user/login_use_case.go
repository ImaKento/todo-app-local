package user

import (
	"errors"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"go-todo-app/infrastructure/auth"
)

type LoginUseCase struct {
	userRepo repository.IUserRepository
}

type LoginParams struct {
	Email       value_object.Email
	RawPassword string
}

func NewLoginUseCase(userRepo repository.IUserRepository) *LoginUseCase {
	return &LoginUseCase{userRepo}
}

// Executeはログインを行い、JWTトークンを返す
func (usecase *LoginUseCase) Execute(input LoginParams) (string, error) {
	// メールアドレスからユーザ情報取得
	user, err := usecase.userRepo.FindByEmail(input.Email)
	if err != nil {
		return "", err
	}
	if user == nil {
		return "", errors.New("email is incorrect")
	}

	// Passwordの照合
	if err := user.HashedPassword().Compare(input.RawPassword); err != nil {
		return "", err
	}

	// ユーザIDからJWTを発行
	token, err := auth.GenerateJWT(user.Id().Value())
	if err != nil {
		return "", err
	}
	return token, nil
}
