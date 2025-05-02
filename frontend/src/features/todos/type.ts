// タスクの型定義
export interface Task {
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