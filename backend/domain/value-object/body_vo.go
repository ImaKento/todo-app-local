package value_object

import (
	"errors"
	"unicode/utf8"
)

const maxBodyLength = 100

var ErrInvalidBody = errors.New("body must be between 1 and 100 characters")

// BodyはTodoのボディを表す値オブジェクト
type Body struct {
	value string
}

// NewBodyはバリデーションを行って新しいBodyを生成する
func NewBody(body string) (*Body, error) {
	length := utf8.RuneCountInString(body)
	if length > maxBodyLength {
		return nil, ErrInvalidBody
	}
	return &Body{value: body}, nil
}

// ValueメソッドはBodyのstringを返す
func (b Body) Value() string {
	return b.value
}
