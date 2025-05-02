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
	Status      *string    `json:"status"`
	DueDate     *time.Time `json:"due_date"`
	CompletedAt *time.Time `json:"completed_at"`
}

func (dto *UpdateTodoDTO) ToInput() (*todo.UpdateTodoParams, error) {
	var err error

	var titleVo *value_object.Title
	if dto.Title != nil {
		t, err := value_object.NewTitle(*dto.Title)
		if err != nil {
			return nil, err
		}
		titleVo = &t
	}
	var bodyVo *value_object.Body
	if dto.Body != nil {
		bodyVo, err = value_object.NewBody(*dto.Body)
		if err != nil {
			return nil, err
		}
	}
	var statusVo *value_object.Status
	if dto.Status != nil {
		s, err := value_object.NewStatus(*dto.Status)
		if err != nil {
			return nil, err
		}
		statusVo = &s
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
		Status:      statusVo,
		DueDate:     dueDateVo,
		CompletedAt: completedAtVo,
	}, nil
}
