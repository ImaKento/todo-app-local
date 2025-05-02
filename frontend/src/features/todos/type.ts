// タスクの型定義
export interface Task {
    id: string
    title: string
    date: string
    status: "未着手" | "進行中" | "完了"
    icon: string
}

// ドラッグアイテムの型定義
export interface DragItem {
    type: string
    id: string
    status: string
}