package user

import (
	customerror "go-todo-app/custom-error"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"go-todo-app/infrastructure/auth"
	"time"
)

type SignUpUseCase struct {
	userRepo repository.IUserRepository
}

type SignUpParams struct {
	Name           value_object.Name
	Email          value_object.Email
	HashedPassword value_object.HashedPassword
}

func NewSignUpUseCase(userRepo repository.IUserRepository) *SignUpUseCase {
	return &SignUpUseCase{userRepo}
}

// ユーザを登録し、JWTトークンを返す
func (usecase *SignUpUseCase) Execute(input SignUpParams) (string, error) {
	// メールアドレス重複の検証
	existingUser, err := usecase.userRepo.FindByEmail(input.Email)
	if err != nil {
		return "", err
	}
	if existingUser != nil {
		return "", customerror.NewConflictError("email already used")
	}

	// Userエンティティを作成
	userEntity := entity.NewUser(
		value_object.NewUserId(),
		input.Name,
		input.Email,
		input.HashedPassword,
		time.Now(),
		time.Now(),
	)

	// 作成したUserエンティティを保存
	newUser, err := usecase.userRepo.Save(&userEntity)
	if err != nil {
		return "", err
	}

	// UserIDを使ってJWTを発行
	token, err := auth.GenerateJWT(newUser.Id().Value())
	if err != nil {
		return "", err
	}
	return token, nil
}
