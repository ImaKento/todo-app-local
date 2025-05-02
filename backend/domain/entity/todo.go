package entity

import (
	value_object "go-todo-app/domain/value-object"
	"time"
)

type Todo struct {
	id          value_object.TodoId
	userId      value_object.UserId
	title       value_object.Title
	body        *value_object.Body
	status      value_object.Status
	dueDate     *value_object.DueDate
	completedAt *value_object.CompletedAt
	createdAt   time.Time
	updatedAt   time.Time
}

// NewTodoは新しいTodoを作成する
func NewTodo(
	id value_object.TodoId,
	userId value_object.UserId,
	title value_object.Title,
	body *value_object.Body,
	status value_object.Status,
	dueDate *value_object.DueDate,
	completedAt *value_object.CompletedAt,
	createdAt time.Time,
	updatedAt time.Time,
) Todo {
	return Todo{
		id:          id,
		userId:      userId,
		title:       title,
		body:        body,
		status:      status,
		dueDate:     dueDate,
		completedAt: completedAt,
		createdAt:   createdAt,
		updatedAt:   updatedAt,
	}
}

// ゲッター関数
func (t *Todo) Id() value_object.TodoId                { return t.id }
func (t *Todo) UserId() value_object.UserId            { return t.userId }
func (t *Todo) Title() value_object.Title              { return t.title }
func (t *Todo) Body() *value_object.Body               { return t.body }
func (t *Todo) Status() value_object.Status            { return t.status }
func (t *Todo) DueDate() *value_object.DueDate         { return t.dueDate }
func (t *Todo) CompletedAt() *value_object.CompletedAt { return t.completedAt }
func (t *Todo) CreatedAt() time.Time                   { return t.createdAt }
func (t *Todo) UpdatedAt() time.Time                   { return t.updatedAt }

// セッター関数
func (t *Todo) SetTitle(title value_object.Title)                    { t.title = title }
func (t *Todo) SetBody(body *value_object.Body)                      { t.body = body }
func (t *Todo) SetStatus(status value_object.Status)                 { t.status = status }
func (t *Todo) SetDueDate(dueDate *value_object.DueDate)             { t.dueDate = dueDate }
func (t *Todo) SetCompletedAt(completedAt *value_object.CompletedAt) { t.completedAt = completedAt }
func (t *Todo) UpdateTimestamp()                                     { t.updatedAt = time.Now() }
