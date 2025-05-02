package value_object

import (
	"errors"
	"unicode/utf8"
)

const maxNameLength = 50

var ErrInvalidName = errors.New("name must be between 1 and 50 characters")

// NameはUserの名前を表す値オブジェクト
type Name struct {
	value string
}

// NewNameはバリデーションを行って新しいNameを生成する
func NewName(name string) (Name, error) {
	length := utf8.RuneCountInString(name)
	if length == 0 || length > maxNameLength {
		return Name{}, ErrInvalidName
	}
	return Name{value: name}, nil
}

// ValueメソッドはBodyのstringを返す
func (n Name) Value() string {
	return n.value
}
