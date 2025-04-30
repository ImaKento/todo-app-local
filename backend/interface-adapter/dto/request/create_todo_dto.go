package request

import (
	"go-todo-app/application/todo"
	value_object "go-todo-app/domain/value-object"
	"time"
)

// Create用のDTOと変換処理
type CreateTodoDTO struct {
	Title       string     `json:"title" validate:"required"`
	Body        *string    `json:"body"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
}

func (dto *CreateTodoDTO) ToInput(userId string) (*todo.CreateTodoParams, error) {
	userIdVo, err := value_object.FromStringUserId(userId)
	if err != nil {
		return nil, err
	}
	titleVo, err := value_object.NewTitle(dto.Title)
	if err != nil {
		return nil, err
	}
	var bodyVo *value_object.Body
	if dto.Body != nil {
		bodyVo, err = value_object.NewBody(*dto.Body)
		if err != nil {
			return nil, err
		}
	}
	var dueDateVo *value_object.DueDate
	if dto.DueDate != nil {
		dueDateVo, err = value_object.NewDueDate(*dto.DueDate)
		if err != nil {
			return nil, err
		}
	}
	var completedAtVo *value_object.CompletedAt
	if dto.CompletedAt != nil {
		completedAtVo, err = value_object.NewCompletedAt(*dto.CompletedAt)
		if err != nil {
			return nil, err
		}
	}

	return &todo.CreateTodoParams{
		UserId:      userIdVo,
		Title:       titleVo,
		Body:        bodyVo,
		DueDate:     dueDateVo,
		CompletedAt: completedAtVo,
	}, nil
}
