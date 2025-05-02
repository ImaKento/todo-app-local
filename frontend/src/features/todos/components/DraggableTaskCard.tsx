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
                        <div className="text-xl">{task.icon}</div>
                        <div className="flex-1">
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-500 mb-3">{task.date}</p>
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