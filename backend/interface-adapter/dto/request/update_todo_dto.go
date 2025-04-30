package request

import (
	"go-todo-app/application/todo"
	value_object "go-todo-app/domain/value-object"
	"time"
)

// Update用のDTOと変換処理
type UpdateTodoDTO struct {
	Title       *string    `json:"title"`
	Body        *string    `json:"body"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
}

func (dto *UpdateTodoDTO) ToInput() (*todo.UpdateTodoParams, error) {
	var err error

	var titleVo *value_object.Title
	if dto.Title != nil {
		tmp, err := value_object.NewTitle(*dto.Title)
		if err != nil {
			return nil, err
		}
		titleVo = &tmp
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

	return &todo.UpdateTodoParams{
		Title:       titleVo,
		Body:        bodyVo,
		DueDate:     dueDateVo,
		CompletedAt: completedAtVo,
	}, nil
}
