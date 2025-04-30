package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// GenerateJWTは生成したJWTを返す
func GenerateJWT(userId string) (string, error) {
	jwtSecretKey := []byte(os.Getenv("JWT_SECRET_KEY"))
	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecretKey)
}
