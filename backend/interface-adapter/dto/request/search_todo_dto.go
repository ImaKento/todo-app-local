package request

import (
	value_object "go-todo-app/domain/value-object"
	"strconv"
	"time"
)

// Search用のDTOと変換処理
type SearchTodoDTO struct {
	Title     *string
	Body      *string
	Status    *string
	DueFrom   *string
	DueTo     *string
	Completed *string
}

func (dto *SearchTodoDTO) ToInput(userId string) (*value_object.SearchTodoParams, error) {
	userIdVo, err := value_object.FromStringUserId(userId)
	if err != nil {
		return nil, err
	}
	var titleVo *value_object.Title
	if dto.Title != nil && *dto.Title != "" {
		t, err := value_object.NewTitle(*dto.Title)
		if err != nil {
			return nil, err
		}
		titleVo = &t
	}
	var bodyVo *value_object.Body
	if dto.Body != nil && *dto.Body != "" {
		bodyVo, err = value_object.NewBody(*dto.Body)
		if err != nil {
			return nil, err
		}
	}
	var statusVo *value_object.Status
	if dto.Status != nil && *dto.Status != "" {
		s, err := value_object.NewStatus(*dto.Status)
		if err != nil {
			return nil, err
		}
		statusVo = &s
	}
	var dueFromVo *value_object.DueDate
	if dto.DueFrom != nil && *dto.DueFrom != "" {
		parsed, err := time.Parse("2006-01-02", *dto.DueFrom)
		if err != nil {
			return nil, err
		}
		dueFrom, err := value_object.NewDueDate(parsed)
		if err != nil {
			return nil, err
		}
		dueFromVo = dueFrom
	}
	var dueToVo *value_object.DueDate
	if dto.DueTo != nil && *dto.DueTo != "" {
		parsed, err := time.Parse("2006-01-02", *dto.DueTo)
		if err != nil {
			return nil, err
		}
		dueTo, err := value_object.NewDueDate(parsed)
		if err != nil {
			return nil, err
		}
		dueToVo = dueTo
	}
	var completedVo *bool
	if dto.Completed != nil && *dto.Completed != "" {
		c, err := strconv.ParseBool(*dto.Completed)
		if err != nil {
			return nil, err
		}
		completedVo = &c
	}

	return &value_object.SearchTodoParams{
		UserId:    userIdVo,
		Title:     titleVo,
		Body:      bodyVo,
		Status:    statusVo,
		DueFrom:   dueFromVo,
		DueTo:     dueToVo,
		Completed: completedVo,
	}, nil
}
