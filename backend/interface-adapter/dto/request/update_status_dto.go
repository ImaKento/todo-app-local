package request

import value_object "go-todo-app/domain/value-object"

type UpdateStatusDTO struct {
	Status string
}

func (dto *UpdateStatusDTO) ToInput() (*value_object.Status, error) {
	status, err := value_object.NewStatus(dto.Status)
	if err != nil {
		return nil, err
	}
	return &status, nil
}
