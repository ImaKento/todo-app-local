package middleware

import (
	"go-todo-app/infrastructure/auth"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

// AuthMiddlewareはJWT認証を行うミドルウェア
func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		authHeader := ctx.Request().Header.Get("Authorization")
		if authHeader == "" {
			return ctx.JSON(http.StatusUnauthorized, map[string]string{"error": "missing Authorization header"})
		}

		// "Bearer トークン"形式を分解
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			return ctx.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid Authorization format"})
		}
		tokenString := parts[1]

		// JWTトークンを検証
		claims, err := auth.ParseJWT(tokenString)
		if err != nil {
			return ctx.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid token"})
		}

		ctx.Set("user_id", claims["user_id"])

		return next(ctx)
	}
}
