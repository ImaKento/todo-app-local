package value_object

import (
	"errors"
	"time"
)

var ErrInvalidDueDate = errors.New("due date must not be in the past")

// DueDateはTodoの期限日を表す値オブジェクト
type DueDate struct {
	value time.Time
}

// NewDueDateは与えられた時刻が未来であるかを検証し、DueDateを生成する
func NewDueDate(dueDate time.Time) (*DueDate, error) {
	now := time.Now()
	if dueDate.Before(now) {
		return nil, ErrInvalidDueDate
	}
	return &DueDate{value: dueDate}, nil
}

// Valueはtime.Time型の値を返す
func (d *DueDate) Value() time.Time {
	return d.value
}
