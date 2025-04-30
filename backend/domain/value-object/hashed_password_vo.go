package value_object

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

const minPasswordLength = 8

var ErrPasswordTooShort = errors.New("password must be at least 8 characters")
var ErrPasswordMismatch = errors.New("password does not match the hash")

// HashedPasswordはUserのパスワードを表す値オブジェクト
type HashedPassword struct {
	value string
}

// NewHashedPasswordは生のパスワードを受け取り、ハッシュ化したパスワードを生成する
func NewHashedPassword(plain string) (HashedPassword, error) {
	if len(plain) < minPasswordLength {
		return HashedPassword{}, ErrPasswordTooShort
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return HashedPassword{}, err
	}
	return HashedPassword{value: string(hashedBytes)}, nil
}

// HashedPasswordFromStringはDBからのパスワードを受け取り、HashPassword型に変換する
func HashedPasswordFromString(plain string) HashedPassword {
	return HashedPassword{value: plain}
}

// Compareは生のパスワードを受け取り、比較検証する
func (h HashedPassword) Compare(plain string) error {
	return bcrypt.CompareHashAndPassword([]byte(h.value), []byte(plain))
}

// ValueメソッドはHashedPasswordのstringを返す
func (h HashedPassword) Value() string {
	return h.value
}
