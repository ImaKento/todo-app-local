package value_object

import (
	"errors"
	"time"
)

var ErrInvalidCompletedAt = errors.New("completed at must not be in future")

// CompletedAtはタスクの完了日時を表す値オブジェクト（nilで未完了）
type CompletedAt struct {
	value time.Time
}

// NewCompletedAtは完了日時を設定するファクトリ関数
func NewCompletedAt(completedAt time.Time) (*CompletedAt, error) {
	now := time.Now()
	if completedAt.After(now) {
		return nil, ErrInvalidCompletedAt
	}
	return &CompletedAt{value: completedAt}, nil
}

// Valueはtime.Time型の値を返す
func (c *CompletedAt) Value() time.Time {
	return c.value
}
