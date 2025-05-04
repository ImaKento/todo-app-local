import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTodoParams, createTodoSchema, Todo, UpdateTodoParams, updateTodoSchema } from "@/features/todos/schemas/TodoSchema"
import { useTodoContext } from "@/contexts/TodoContext"

export const useCreateTodo = (onSuccess?: () => void) => {
    const { createTodo, fetchAllTodos } = useTodoContext()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createTodoSchema),
    })

    const onSubmit = async (input: CreateTodoParams) => {
        try {
            const payload = {
                ...input,
                due_date: input.due_date ? new Date(input.due_date).toISOString() : undefined,
            };
            await createTodo(payload)
            if (onSuccess) {
                onSuccess()
            }
            await fetchAllTodos()
        } catch (err) {
            setError("Todoの作成に失敗しました")
        }
    }

    return {
        register,
        handleSubmit,
        setValue,
        reset,
        errors,
        isSubmitting,
        onSubmit,
        error,
    }
}

export const useEditTodo = (originalTodo: Todo) => {
    const { updateTodo, fetchAllTodos } = useTodoContext()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(updateTodoSchema),
    })

    const onSubmit = async (input: UpdateTodoParams) => {
        try {
            const updatedTodo: Todo = {
                ...originalTodo,
                title: input.title ?? originalTodo.title,
                body: input.body ?? originalTodo.body,
                status: input.status,
                dueDate: input.due_date ? new Date(input.due_date) : undefined,
                completedAt: input.completed_at ? new Date(input.completed_at) : undefined,
            }
            await updateTodo(updatedTodo)
            await fetchAllTodos()
        } catch (err) {
            setError("Todoの更新に失敗しました")
        }
    }

    return {
        register,
        handleSubmit,
        setValue,
        reset,
        errors,
        isSubmitting,
        onSubmit,
        error,
    }
}

export const useUpdateTodo = () => {
    const { todos, updateTodo, fetchAllTodos } = useTodoContext()

    const completeTodo = async (todo_id: string) => {
        const todo = todos.find(t => t.id === todo_id)
        if (!todo) return 

        try {
            await updateTodo({...todo, completedAt: new Date()})
            await fetchAllTodos()
        } catch (err) {
            console.error("Todoの完了に失敗しました", err)
        }
    }

    const moveTodo = async (todo_id: string, newStatus: Todo["status"]) => {
        const todo = todos.find(t => t.id === todo_id)
        if (!todo) return 

        try {
            await updateTodo({...todo, status: newStatus})
            await fetchAllTodos()
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }

    const moveCompleteTodo = async (todo_id: string) => {
        const todo = todos.find(t => t.id === todo_id)
        if (!todo) return 

        try {
            await updateTodo({...todo, status: "completed"})
            await fetchAllTodos()
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }

    return { completeTodo, moveTodo, moveCompleteTodo }
}