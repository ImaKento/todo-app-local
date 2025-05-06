import { useMemo } from "react"
import { useDrag } from "react-dnd"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Todo } from "@/features/todos/schemas/TodoSchema"
import { DeleteTodoDialog } from "@/features/todos/components/dialogs/DeleteTodoDialog"

const ICONS = [
    // ✏️ 文房具
    "📝", "📌", "📎", "📂", "📚", "📒", "📋", "✂️", "🖊️", "🖋️",
    
    // 🌸 花・植物
    "🌸", "🌼", "🌻", "🌷", "🌿", "🍀", "🌺", "🌹",
  
    // 🐾 動物
    "🐶", "🐱", "🐰", "🐼", "🦊", "🐧", "🐥", "🦉",
  
    // 🚗 乗り物
    "🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚀", "✈️", "🚲",
  
    // 💡 アイデア・ツール
    "💡", "🔧", "🔨", "🛠️", "🧰", "🧠", "⚙️", "📡",
  
    // 🎉 楽しい系
    "🎉", "🎈", "🎁", "🎨", "🎵", "🎮", "🎯",
  
    // ⏰ 時間・予定
    "⏰", "🗓️", "📅", "🕒", "⏳",
  
    // 🧼 ライフスタイル・日用品
    "🛏️", "🚿", "🍽️", "🍵", "🧹", "🧼",
  
    // 🍎 食べ物
    "🍎", "🍊", "🍞", "🍔", "🍙", "🍰", "🍩", "🍕"
]

// 文字列ID → アイコン配列のインデックスに変換する簡易ハッシュ関数
const getIconFromId = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return ICONS[Math.abs(hash) % ICONS.length]
}

// ドラッグ可能なタスクカードコンポーネント
export function DraggableTodoCard({
    todo,
    onDuplicateButton,
    onCompleteButton,
    onDeleteButton,
    onCardClick,
}: {
    todo: Todo
    onDuplicateButton?: (todoId: string) => void
    onCompleteButton?: (todoId: string) => void
    onDeleteButton?: (todoId: string) => void
    onCardClick: () => void
}) {
    // ドラッグ処理の設定
    const [{ isDragging }, drag] = useDrag({
        type: "todo",
        item: { type: "todo", id: todo.id, status: todo.status },
        collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging(),
        }),
    })

    const icon = useMemo(() => getIconFromId(todo.id), [todo.id])
    
    return (
        <div
            ref={drag as unknown as React.Ref<HTMLDivElement>}
            onClick={onCardClick}
            className={cn(
                "mb-3 cursor-grab active:cursor-grabbing transition-opacity",
                isDragging ? "opacity-50" : "opacity-100",
            )}
        >
            <Card className="bg-white relative">
                {onDuplicateButton &&
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDuplicateButton(todo.id)
                        }}
                        >
                        <Plus className="h-4 w-4" />
                    </Button>
                }
                <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl min-w-[48px] text-center">{icon}</div>
                        <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900 w-full overflow-hidden whitespace-nowrap truncate">
                                {todo.title}
                            </h3>
                        </div>

                        <p className="text-sm text-gray-600 mt-1 mb-2 break-words overflow-y-auto max-h-24">
                            {todo.body}
                        </p>
                        <p className="text-xs text-gray-400 mb-3">
                            {todo.dueDate ? todo.dueDate.toLocaleDateString() : "期限未設定"}
                        </p>
                        {onCompleteButton &&
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onCompleteButton(todo.id)
                                }}
                                className="text-sm mr-2"
                            >
                                完了！
                            </Button>
                        }
                        {onDeleteButton &&
                            <DeleteTodoDialog
                                todoId={todo.id}
                                onDelete={(id) => {
                                    onDeleteButton(id)
                                }}
                            />
                        }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}