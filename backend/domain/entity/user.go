package entity

import (
	value_object "go-todo-app/domain/value-object"
	"time"
)

type User struct {
	id             value_object.UserId
	name           value_object.Name
	email          value_object.Email
	hashedPassword value_object.HashedPassword
	createdAt      time.Time
	updatedAt      time.Time
}

// NewUserは新しいUserを作成する
func NewUser(
	id value_object.UserId,
	name value_object.Name,
	email value_object.Email,
	hashedPassword value_object.HashedPassword,
	createdAt time.Time,
	updatedAt time.Time,
) User {
	return User{
		id:             id,
		name:           name,
		email:          email,
		hashedPassword: hashedPassword,
		createdAt:      createdAt,
		updatedAt:      updatedAt,
	}
}

// ゲッター関数
func (u *User) Id() value_object.UserId                     { return u.id }
func (u *User) Name() value_object.Name                     { return u.name }
func (u *User) Email() value_object.Email                   { return u.email }
func (u *User) HashedPassword() value_object.HashedPassword { return u.hashedPassword }
func (u *User) CreatedAt() time.Time                        { return u.createdAt }
func (u *User) UpdatedAt() time.Time                        { return u.updatedAt }
