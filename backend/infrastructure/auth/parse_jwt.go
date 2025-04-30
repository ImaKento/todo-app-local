package auth

import (
	"errors"
	"os"

	"github.com/golang-jwt/jwt/v4"
)

func ParseJWT(tokenString string) (jwt.MapClaims, error) {
	jwtSecretKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//　署名アルゴリズムの検証
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return jwtSecretKey, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
