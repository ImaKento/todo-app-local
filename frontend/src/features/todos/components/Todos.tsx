import { Calendar, Plus, RefreshCw, Search, Settings, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TaskColumn } from "./TaskColumn"
import { useTasks } from "../hooks/useTasks"

export default function Todos() {
    const {
        completeTask,
        moveTask,
        addNewTask,
        getTasksByStatus,
        getTaskCountByStatus,
    } = useTasks([
        {
            id: "1",
            title: "新しいヘッドホンを注文",
            date: "2024/02/09",
            status: "未着手",
            icon: "🎧",
        },
        {
            id: "2",
            title: "歯医者の予約",
            date: "2024/01/29",
            status: "未着手",
            icon: "🖋️",
        },
        {
            id: "3",
            title: "「ジェームズ・クリアー式 複利で伸びる1つの習慣」を読む",
            date: "2024/03/31",
            status: "進行中",
            icon: "📕",
        },
        {
            id: "4",
            title: "お母さんに電話",
            date: "2024/01/31",
            status: "進行中",
            icon: "👋",
        },
        {
            id: "5",
            title: "休暇中の予定を決める",
            date: "2024/02/23",
            status: "進行中",
            icon: "🌴",
        },
        {
            id: "6",
            title: "配車サービスを予約",
            date: "2024/01/01",
            status: "完了",
            icon: "🚗",
        },
    ])

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
                    <TaskColumn
                        title="未着手"
                        status="未着手"
                        color="bg-red-500"
                        bgColor="bg-red-50"
                        hoverColor="hover:bg-red-100"
                        tasks={getTasksByStatus("未着手")}
                        count={getTaskCountByStatus("未着手")}
                        onComplete={completeTask}
                        onMoveTask={moveTask}
                        onAddNewTask={addNewTask}
                    />

                    {/* 進行中列 */}
                    <TaskColumn
                        title="進行中"
                        status="進行中"
                        color="bg-blue-500"
                        bgColor="bg-blue-50"
                        hoverColor="hover:bg-blue-100"
                        tasks={getTasksByStatus("進行中")}
                        count={getTaskCountByStatus("進行中")}
                        onComplete={completeTask}
                        onMoveTask={moveTask}
                        onAddNewTask={addNewTask}
                    />

                    {/* 完了列 */}
                    <TaskColumn
                        title="完了"
                        status="完了"
                        color="bg-green-500"
                        bgColor="bg-green-50"
                        hoverColor="hover:bg-green-100"
                        tasks={getTasksByStatus("完了")}
                        count={getTaskCountByStatus("完了")}
                        onComplete={completeTask}
                        onMoveTask={moveTask}
                        onAddNewTask={addNewTask}
                        emoji="🎉"
                    />
                </div>
            </div>
        </DndProvider>
    )
}

