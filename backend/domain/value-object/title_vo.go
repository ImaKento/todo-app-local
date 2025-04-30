package value_object

import (
	"errors"
	"unicode/utf8"
)

const maxTitleLength = 50

var ErrInvalidTitle = errors.New("title must be between 1 and 50 characters")

// TitleはTodoのタイトルを表す値オブジェクト
type Title struct {
	value string
}

// NewTitleはバリデーションを行って新しいTitleを生成する
func NewTitle(title string) (Title, error) {
	length := utf8.RuneCountInString(title)
	if length == 0 || length > maxTitleLength {
		return Title{}, ErrInvalidTitle
	}
	return Title{value: title}, nil
}

// ValueメソッドはTitleのstringを返す
func (t Title) Value() string {
	return t.value
}
