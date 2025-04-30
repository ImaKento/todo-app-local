package response

import (
	"go-todo-app/domain/entity"
	"time"
)

type TodoDTO struct {
	ID          string     `json:"id"`
	UserId      string     `json:"user_id"`
	Title       string     `json:"title"`
	Body        *string    `json:"body"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

func ToResponseTodoDTO(todo *entity.Todo) *TodoDTO {
	var body *string
	if todo.Body() != nil {
		b := todo.Body().Value()
		body = &b
	}
	var dueDate *time.Time
	if todo.DueDate() != nil {
		d := todo.DueDate().Value()
		dueDate = &d
	}
	var completedAt *time.Time
	if todo.CompletedAt() != nil {
		c := todo.CompletedAt().Value()
		completedAt = &c
	}

	return &TodoDTO{
		ID:          todo.Id().Value(),
		UserId:      todo.UserId().Value(),
		Title:       todo.Title().Value(),
		Body:        body,
		DueDate:     dueDate,
		CompletedAt: completedAt,
		CreatedAt:   todo.CreatedAt(),
		UpdatedAt:   todo.UpdatedAt(),
	}
}
