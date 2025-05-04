import { createContext, useContext, useState } from "react"
import { Todo, CreateTodoParams, TodoResponse, UpdateTodoParams } from "@/features/todos/schemas/TodoSchema"
import { getAllTodo, createTodo as createTodoAPI, updateTodo as updateTodoAPI } from "@/features/todos/service/todoService"

interface TodoContextType {
  todos: Todo[]
  fetchAllTodos: () => Promise<void>
  createTodo: (newTodo: CreateTodoParams) => Promise<void>
  updateTodo: (updatedTodo: Todo) => Promise<void>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchAllTodos = async () => {
    try {
      const response = await getAllTodo()
      const todos = response.map(convertToTodo)
      setTodos(todos)
    } catch (error) {
      console.error("Todoの取得に失敗しました", error)
    }
  }

  const createTodo = async (params: CreateTodoParams) => {
    try {
      const response = await createTodoAPI(params)
      const newTodo = convertToTodo(response)
      setTodos((prev) => [...prev, newTodo])
    } catch (error) {
      console.error("Todoの作成に失敗しました", error)
    }
  }

  const updateTodo = async (updatedTodo: Todo) => {
    const todo_id = updatedTodo.id
    const params: UpdateTodoParams = {
      title: updatedTodo.title,
      body: updatedTodo.body ?? undefined,
      due_date: updatedTodo.dueDate ? updatedTodo.dueDate.toISOString() : undefined,
      status: updatedTodo.status,
      completed_at: updatedTodo.completedAt ? updatedTodo.completedAt.toISOString() : undefined,
    }

    try {
      const response = await updateTodoAPI(todo_id, params)
      const updatedTodo = convertToTodo(response)
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Todoの更新に失敗しました", error)
    }
  }

  return (
    <TodoContext.Provider value={{ todos, fetchAllTodos, createTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = (): TodoContextType => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error("useTodoContext must be used within a TodoProvider")
  return ctx
}

const convertToTodo = (res: TodoResponse): Todo => {
  return {
    id: res.id,
    userId: res.user_id,
    title: res.title,
    body: res.body ?? undefined,
    status: res.status,
    dueDate: res.due_date ? new Date(res.due_date) : undefined,
    completedAt: res.completed_at ? new Date(res.completed_at) : undefined,
    createdAt: new Date(res.created_at),
    updatedAt: new Date(res.updated_at),
  }
}