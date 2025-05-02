import { useDrag } from "react-dnd"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Task } from "@/features/todos/type"


// ドラッグ可能なタスクカードコンポーネント
export function DraggableTaskCard({ task, onComplete }: { task: Task; onComplete: (id: string) => void }) {
    // ドラッグ処理の設定
    const [{ isDragging }, drag] = useDrag({
        type: "task",
        item: { type: "task", id: task.id, status: task.status },
        collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging(),
        }),
    })

    return (
        <div
        ref={drag as unknown as React.Ref<HTMLDivElement>}
        className={cn(
            "mb-3 cursor-grab active:cursor-grabbing transition-opacity",
            isDragging ? "opacity-50" : "opacity-100",
        )}
        >
            <Card className="bg-white">
                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-xl">{/* アイコンをランダムに表示させる */}</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.body}</p>
                            <p className="text-xs text-gray-400 mb-3">
                                {task.dueDate ? task.dueDate.toLocaleDateString() : "期限未設定"}
                            </p>
                            <Button variant="outline" size="sm" onClick={() => onComplete(task.id)} className="text-sm">
                                完了！
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}