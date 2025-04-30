package value_object

import (
	"errors"

	"github.com/lucsky/cuid"
)

var ErrInvalidUserId = errors.New("invalid user ID format")

// UserIdはUserのIDを表す値オブジェクト
type UserId struct {
	value string
}

// NewUserIdは新しいUserIdを生成する
func NewUserId() UserId {
	return UserId{value: cuid.New()}
}

// ValueメソッドはUserIdのstringを返す
func (id UserId) Value() string {
	return id.value
}

// FromStringUserIdはstring型を受け取り、UserIdを返す
func FromStringUserId(id string) (UserId, error) {
	if err := cuid.IsCuid(id); err != nil {
		return UserId{}, ErrInvalidUserId
	}
	return UserId{value: id}, nil
}
