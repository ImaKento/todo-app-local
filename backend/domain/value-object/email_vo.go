package value_object

import (
	"errors"
	"regexp"
)

var ErrInvalidEmail = errors.New("invalid email format")

// EmailはUserのメールアドレスを表す値オブジェクト
type Email struct {
	value string
}

// NewEmailはバリデーション後、Email型を返す
func NewEmail(email string) (Email, error) {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	if !re.MatchString(email) {
		return Email{}, ErrInvalidEmail
	}
	return Email{value: email}, nil
}

// ValueメソッドはEmailのstringを返す
func (e Email) Value() string {
	return e.value
}
