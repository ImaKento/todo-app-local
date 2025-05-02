package value_object

type SearchTodoParams struct {
	UserId    UserId
	Title     *Title
	Body      *Body
	Status    *Status
	DueFrom   *DueDate
	DueTo     *DueDate
	Completed *bool
}
