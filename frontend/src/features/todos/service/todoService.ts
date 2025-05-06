import { todosResponseSchema, TodoResponse, CreateTodoParams, UpdateTodoParams, todoResponseSchema } from "../schemas/TodoSchema"

const API_URL = "http://localhost:8080"

export const getAllTodo = async (): Promise<TodoResponse[]> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/?completed=false`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Todo一覧取得に失敗")
    }

    const json = await res.json()
    const parsed = todosResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data ?? []
}

export const createTodo = async (params: CreateTodoParams): Promise<TodoResponse> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(params)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Todoの作成に失敗")
    }

    const json = await res.json()
    const parsed = todoResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data
}

export const updateTodo = async (todo_id: string, params: UpdateTodoParams): Promise<TodoResponse> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/${todo_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(params)
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Todoの更新に失敗")
    }

    const json = await res.json()
    const parsed = todoResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data
}
