import { SearchTodoParams, todosResponseSchema, TodoResponse, CreateTodoParams, UpdateTodoParams, todoResponseSchema } from "../schemas/TodoSchema"

const API_URL = "http://localhost:8080"

export const getAllTodo = async (): Promise<TodoResponse[]> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/`, {
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

export const getTodosByCondition = async (params: SearchTodoParams): Promise<TodoResponse[]> => {
    const token = localStorage.getItem("access-token")
    const query = toQueryString(params)
    const res = await fetch(`${API_URL}/api/todos/?${query}`, {
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

export const updateTodo = async (todoId: string, params: UpdateTodoParams): Promise<TodoResponse> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/${todoId}`, {
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

export const duplicateTodo = async (todoId: string): Promise<TodoResponse> => {
    const token = localStorage.getItem("access-token")
    const res = await fetch(`${API_URL}/api/todos/${todoId}/duplicate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Todoの複製に失敗")
    }

    const json = await res.json()
    const parsed = todoResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data
}

function toQueryString(params: Record<string, any>): string {
    const esc = encodeURIComponent
    return Object.entries(params)
        .filter(([_default, v]) => v !== undefined && v !== null)
        .map(([k, v]) => 
            Array.isArray(v)
                ? v.map(val => `${esc(k)}=${esc(val)}`).join("&")
                : `${esc(k)}=${esc(v)}`
        )
        .join("&")
}