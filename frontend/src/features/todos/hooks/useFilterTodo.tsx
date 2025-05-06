import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTodoParams, createTodoSchema, Todo, UpdateTodoParams, updateTodoSchema } from "@/features/todos/schemas/TodoSchema"
import { useTodoContext } from "@/contexts/TodoContext"

// export const useSearchTodo = (conditions: SearchTodoParams) => {
//     const { fetchSearchTodos } = useTodoContext()
// }

export const useCreateTodo = (onSuccess?: () => void) => {
    const { createTodo } = useTodoContext()
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
    const { updateTodo } = useTodoContext()
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
    const { todos, duplicateTodo, updateTodo } = useTodoContext()

    const useDuplicateTodo = async (todoId: string) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return

        try {
            await duplicateTodo(todoId)
        } catch (err) {
            console.error("Todoの複製に失敗しました", err)
        }
    }

    const useDeleteTodo = async (todoId: string) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return 

        try {
            await updateTodo({...todo, status: "deleted", completedAt: new Date()})
        } catch (err) {
            console.error("Todoの完了に失敗しました", err)
        }
    }

    const useMoveTodo = async (todoId: string, newStatus: Todo["status"]) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return 

        try {
            if (newStatus === "completed") {
                await updateTodo({...todo, status: newStatus, completedAt: new Date()})
            } else if (newStatus === "deleted") {
                await updateTodo({...todo, status: newStatus})
            } else {
                await updateTodo({...todo, status: newStatus, completedAt: null})
            }
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }

    const useMoveCompleteTodo = async (todoId: string) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return 

        try {
            await updateTodo({...todo, status: "completed"})
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }

    return { useDuplicateTodo, useDeleteTodo, useMoveTodo, useMoveCompleteTodo }
}