import { Calendar, Plus, RefreshCw, Search, Settings, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TodoColumn } from "@/features/todos/components/list/TodoColumn"
import { useUpdateTodo } from "@/features/todos/hooks/useTodos"
import { Todo } from "@/features/todos/schemas/TodoSchema";

type Props = {
    todos: Todo[]
    loading: boolean
}

export default function TodoList({ todos, loading }: Props) {
    const { moveTodo, moveCompleteTodo, completeTodo } = useUpdateTodo()

    if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-4 text-gray-700">タスクを読み込んでいます...</span>
          </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto p-4">
                {/* ヘッダー部分 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            全タスク（ステータス別）
                        </Button>
                        <Button variant="outline">
                            <SortDesc className="h-4 w-4 mr-2" />
                            期限昇順
                        </Button>
                        <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            カレンダー
                        </Button>
                            <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-600">
                            New
                            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* カンバンボード */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 未着手列 */}
                    <TodoColumn
                        title="未着手"
                        status="not_started"
                        color="bg-red-500"
                        bgColor="bg-red-50"
                        hoverColor="hover:bg-red-100"
                        todos={todos.filter(t => t.status === "not_started")}
                        count={todos.filter(t => t.status === "not_started").length}
                        onMoveTodo={moveTodo}
                        onClickButton={moveCompleteTodo}
                    />

                    {/* 進行中列 */}
                    <TodoColumn
                        title="進行中"
                        status="in_progress"
                        color="bg-blue-500"
                        bgColor="bg-blue-50"
                        hoverColor="hover:bg-blue-100"
                        todos={todos.filter(t => t.status === "in_progress")}
                        count={todos.filter(t => t.status === "in_progress").length}
                        onMoveTodo={moveTodo}
                        onClickButton={moveCompleteTodo}
                    />

                    {/* 完了列 */}
                    <TodoColumn
                        title="完了"
                        status="completed"
                        color="bg-green-500"
                        bgColor="bg-green-50"
                        hoverColor="hover:bg-green-100"
                        todos={todos.filter(t => t.status === "completed")}
                        count={todos.filter(t => t.status === "completed").length}
                        onMoveTodo={moveTodo}
                        onClickButton={completeTodo}
                        emoji="🎉"
                    />
                </div>
            </div>
        </DndProvider>
    )
}

