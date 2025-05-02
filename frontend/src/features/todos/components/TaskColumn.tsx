import { useDrop } from "react-dnd"
import { cn } from "@/lib/utils"
import { Task, DragItem } from "@/features/todos/type"
import { DraggableTaskCard } from "./DraggableTaskCard"
import { NewTaskButton } from "./NewTaskButton"

// タスク列コンポーネント
export function TaskColumn({
    title,
    status,
    color,
    bgColor,
    hoverColor,
    tasks,
    count,
    onComplete,
    onMoveTask,
    onAddNewTask,
    emoji = "",
}: {
    title: string
    status: "未着手" | "進行中" | "完了"
    color: string
    bgColor: string
    hoverColor: string
    tasks: Task[]
    count: number
    onComplete: (id: string) => void
    onMoveTask: (id: string, status: "未着手" | "進行中" | "完了") => void
    onAddNewTask: (status: "未着手" | "進行中" | "完了") => void
    emoji?: string
}) {
    // ドロップ処理の設定
    const [{ isOver }, drop] = useDrop({
        accept: "task",
        drop: (item: DragItem) => {
        if (item.status !== status) {
            onMoveTask(item.id, status)
        }
        },
        collect: (monitor: any) => ({
        isOver: !!monitor.isOver(),
        }),
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <h2 className="font-medium">
                    {title} {emoji}
                </h2>
                <span className="text-gray-500 ml-2">{count}</span>
            </div>
            <div
                ref={(node) => {
                    if (node) drop(node)
                }}
                className={cn(bgColor, "rounded-lg p-4 min-h-[500px] transition-colors", isOver && "ring-2 ring-blue-400")}
            >
                {tasks.map((task) => (
                    <DraggableTaskCard key={task.id} task={task} onComplete={onComplete} />
                ))}
                <NewTaskButton onClick={() => onAddNewTask(status)} className={cn(bgColor, hoverColor)} />
            </div>
        </div>
    )
}