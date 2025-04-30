package value_object

import (
	"errors"

	"github.com/lucsky/cuid"
)

var ErrEmptyId = errors.New("todo id cannot be empty")
var ErrInvalidTodoId = errors.New("invalid todo ID format")

// TodoIdはUserのIDを表す値オブジェクト
type TodoId struct {
	value string
}

// NewUserIdは新しいTodoIdを生成する
func NewTodoId() TodoId {
	return TodoId{value: cuid.New()}
}

// FromStringTodoIdはstring型を受け取りバリデーション後、TodoIdを返す
func FromStringTodoId(id string) (TodoId, error) {
	if err := cuid.IsCuid(id); err != nil {
		return TodoId{}, ErrInvalidTodoId
	}
	return TodoId{value: id}, nil
}

// ValueメソッドはTodoIdのstringを返す
func (id TodoId) Value() string {
	return id.value
}
