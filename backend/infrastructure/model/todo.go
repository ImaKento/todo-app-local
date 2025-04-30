package model

import "time"

type Todo struct {
	ID          string     `json:"id"`
	UserId      string     `json:"user_id"`
	Title       string     `json:"title"`
	Body        *string    `json:"body"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}
