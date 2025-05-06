//go:build wireinject
// +build wireinject

package di

import (
	"go-todo-app/application/todo"
	"go-todo-app/application/user"
	"go-todo-app/infrastructure/repository"
	"go-todo-app/infrastructure/supabase"
	"go-todo-app/interface-adapter/handler"

	"github.com/google/wire"
)

// InitializeUserControllerは依存関係を組み立ててUserControllerを返す
func InitializeUserController() (*handler.UserController, error) {
	wire.Build(
		supabase.NewSupabaseClient,
		repository.NewUserRepository,
		user.NewSignUpUseCase,
		user.NewLoginUseCase,
		handler.NewUserController,
	)
	return &handler.UserController{}, nil
}

// InitializeTodoControllerは依存関係を組み立ててTodoControllerを返す
func InitializeTodoController() (*handler.TodoController, error) {
	wire.Build(
		supabase.NewSupabaseClient,
		repository.NewTodoRepository,
		todo.NewGetTodoByIdUseCase,
		todo.NewSearchTodoUseCase,
		todo.NewCreateTodoUseCase,
		todo.NewUpdateTodoUseCase,
		todo.NewDuplicateTodoUseCase,
		todo.NewDeleteTodoUseCase,
		handler.NewTodoController,
	)
	return &handler.TodoController{}, nil
}
