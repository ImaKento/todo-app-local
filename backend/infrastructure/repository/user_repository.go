package repository

import (
	"encoding/json"
	"errors"
	"go-todo-app/domain/entity"
	"go-todo-app/domain/repository"
	value_object "go-todo-app/domain/value-object"
	"go-todo-app/infrastructure/model"

	"github.com/supabase-community/supabase-go"
)

type UserRepository struct {
	Client *supabase.Client
}

func NewUserRepository(client *supabase.Client) repository.IUserRepository {
	return &UserRepository{Client: client}
}

// EmailでUserを取得
func (repo *UserRepository) FindByEmail(email value_object.Email) (*entity.User, error) {
	// データ取得
	data, _, err := repo.Client.From("users").Select("*", "", false).Eq("email", email.Value()).Execute()
	if err != nil {
		return nil, err
	}

	// JSON → model.User配列に変換
	var users []model.User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, nil
	}

	// model → entityに変換
	user := userModelToEntity(users[0])
	return &user, nil
}

// Userの作成
func (repo *UserRepository) Save(user *entity.User) (*entity.User, error) {
	// entity → modelに変換
	userModel := userEntityToModel(*user)

	// データを挿入
	data, _, err := repo.Client.From("users").Insert(userModel, false, "", "", "").Execute()
	if err != nil {
		return nil, err
	}

	// JSON → model.Todo配列に変換
	var users []model.User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, errors.New("crate user failed")
	}

	// model → entityに変換
	userEntity := userModelToEntity(users[0])
	return &userEntity, nil
}

// entity.User型をmodel.User型に変換
func userEntityToModel(user entity.User) *model.User {
	return &model.User{
		ID:             user.Id().Value(),
		Name:           user.Name().Value(),
		Email:          user.Email().Value(),
		HashedPassword: user.HashedPassword().Value(),
		CreatedAt:      user.CreatedAt(),
		UpdatedAt:      user.UpdatedAt(),
	}
}

// model.User型をentity.User型に変換
func userModelToEntity(user model.User) entity.User {
	id, _ := value_object.FromStringUserId(user.ID)
	name, _ := value_object.NewName(user.Name)
	email, _ := value_object.NewEmail(user.Email)
	hashedPassword := value_object.HashedPasswordFromString(user.HashedPassword)

	return entity.NewUser(
		id,
		name,
		email,
		hashedPassword,
		user.CreatedAt,
		user.UpdatedAt,
	)
}
