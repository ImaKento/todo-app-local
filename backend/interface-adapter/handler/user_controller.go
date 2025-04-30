package handler

import (
	"go-todo-app/application/user"
	"go-todo-app/interface-adapter/dto/request"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	su *user.SignUpUseCase
	lu *user.LoginUseCase
}

func NewUserController(
	su *user.SignUpUseCase,
	lu *user.LoginUseCase,
) *UserController {
	return &UserController{su, lu}
}

// SignUpはユーザを作成する
func (uc *UserController) SignUp(ctx echo.Context) error {
	// requestをDTOでバインドする
	var userDTO request.SignUpDTO
	if err := ctx.Bind(&userDTO); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// DTO → usecase用のInputに変換
	input, err := userDTO.ToInput()
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	token, err := uc.su.Execute(*input)
	if err != nil {
		if statusErr, ok := err.(interface{ StatusCode() int }); ok {
			return ctx.JSON(statusErr.StatusCode(), map[string]string{"error": err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(http.StatusCreated, map[string]string{"token": token})
}

// Loginはユーザのログインを行う
func (uc *UserController) Login(ctx echo.Context) error {
	// requestをDTOでバインドする
	var userDTO request.LoginDTO
	if err := ctx.Bind(&userDTO); err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// DTO → usecase用のInputに変換
	input, err := userDTO.ToInput()
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	// usecaseの実行
	token, err := uc.lu.Execute(*input)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, map[string]string{"token": token})
}
