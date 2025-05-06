package value_object

import "errors"

// StatusはTodoの状態を表す値オブジェクト
type Status struct {
	value string
}

var (
	ErrInvalidStatus = errors.New("invalid status")
	allowedStatuses  = map[string]bool{
		"not_started": true,
		"in_progress": true,
		"completed":   true,
		"deleted":     true,
	}
)

// NewStatusは有効なステータスかどうかを検証してStatusを生成する
func NewStatus(status string) (Status, error) {
	if !allowedStatuses[status] {
		return Status{}, ErrInvalidStatus
	}
	return Status{value: status}, nil
}

// ValueメソッドはStatusのstringを返す
func (s Status) Value() string {
	return s.value
}
