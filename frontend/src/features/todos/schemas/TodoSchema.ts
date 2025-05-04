import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(1, "タイトルを入力してください").max(50, "タイトルは最大50文字です"),
    body: z.string().max(100, "内容は最大100文字です").optional(),
    due_date: z
        .string()
        .refine(val => val === "" || !isNaN(Date.parse(val)), {
            message: "有効な日付を入力してください",
        })
        .optional(),
    status: z.enum(["not_started", "in_progress", "completed"], {
        required_error: "ステータスを選択してください"
    }),
})
export type CreateTodoParams = z.infer<typeof createTodoSchema>

export const updateTodoSchema = z.object({
    title: z.string().min(1, "タイトルを入力してください").max(50, "タイトルは最大50文字です").optional(),
    body: z.string().max(100, "内容は最大100文字です").optional(),
    due_date: z
        .string()
        .refine(val => val === "" || !isNaN(Date.parse(val)), {
            message: "有効な日付を入力してください",
        })
        .optional(),
    status: z.enum(["not_started", "in_progress", "completed"], {
        required_error: "ステータスを選択してください"
    }),
    completed_at: z
        .string()
        .refine(val => val === "" || !isNaN(Date.parse(val)), {
            message: "有効な日付を入力してください",
        })
        .optional(),
})
export type UpdateTodoParams = z.infer<typeof updateTodoSchema>

export const todoResponseSchema = z.object({
    id: z.string().min(1).max(50),
    user_id: z.string().min(1).max(50),
    title: z.string().min(1).max(50),
    body: z.string().max(100).nullable(),
    status: z.enum(["not_started", "in_progress", "completed"]),
    due_date: z.string().datetime().nullable(),
    completed_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
})
export const todosResponseSchema = z.array(todoResponseSchema)
export type TodoResponse = z.infer<typeof todoResponseSchema>

// タスクの型定義
export interface Todo {
    id: string;
    userId: string;
    title: string;
    body?: string;
    status: "not_started" | "in_progress" | "completed";
    dueDate?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// ドラッグアイテムの型定義
export interface DragItem {
    type: string
    id: string
    status: string
}
