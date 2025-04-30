package customerror

import "net/http"

// NotFoundError (404)
type NotFoundError struct {
	Message string
}

func (e *NotFoundError) Error() string {
	return e.Message
}

func (e *NotFoundError) StatusCode() int {
	return http.StatusNotFound
}

func NewNotFoundError(message string) error {
	return &NotFoundError{Message: message}
}

// UnauthorizedError (403)
type UnauthorizedError struct {
	Message string
}

func (e *UnauthorizedError) Error() string {
	return e.Message
}

func (e *UnauthorizedError) StatusCode() int {
	return http.StatusForbidden
}

func NewUnauthorizedError(message string) error {
	return &UnauthorizedError{Message: message}
}

// ConflictError (409)
type ConflictError struct {
	Message string
}

func (e *ConflictError) Error() string {
	return e.Message
}

func (e *ConflictError) StatusCode() int {
	return http.StatusConflict
}

func NewConflictError(message string) error {
	return &ConflictError{Message: message}
}
