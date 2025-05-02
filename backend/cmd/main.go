package main

import (
	"go-todo-app/di"
	appmiddleware "go-todo-app/interface-adapter/middleware"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// CORS設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	userController, err := di.InitializeUserController()
	if err != nil {
		log.Fatal(err)
	}

	todoController, err := di.InitializeTodoController()
	if err != nil {
		log.Fatal(err)
	}

	api := e.Group("/api")
	usersGroup := api.Group("/users")
	usersGroup.POST("/signup", userController.SignUp)
	usersGroup.POST("/login", userController.Login)

	todosGroup := api.Group("/todos")
	todosGroup.Use(appmiddleware.AuthMiddleware)
	todosGroup.GET("/:id", todoController.GetById)
	todosGroup.GET("/", todoController.Search)
	todosGroup.POST("/", todoController.Create)
	todosGroup.PATCH("/:id", todoController.Update)
	todosGroup.PATCH("/:id/status", todoController.UpdateStatus)
	todosGroup.DELETE("/:id", todoController.Delete)

	// サーバ起動
	e.Logger.Fatal(e.Start(":8080"))
}
