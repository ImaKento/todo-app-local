import { useNavigate } from "react-router-dom"
import { RefreshCw, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"

// 新しいタスク追加ボタン
export function TodoHeader() {
    const navigate = useNavigate()

    const handleStatusClick = () => {
        navigate("/")
    }

    const handleFilterClick = () => {
        navigate("/filter")  // フィルター画面へ遷移
    }
    return (
        <>
            {/* ヘッダー部分 */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 mr-4">
                    <Button
                        variant="outline"
                        className="flex"
                        onClick={handleStatusClick}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        全タスク（ステータス別）
                    </Button>
                </div>
                <div className="flex-1 items-center space-x-4">
                    <Button
                        variant="outline"
                        className="flex"
                        onClick={handleFilterClick}
                    >
                        <ListFilter className="h-4 w-4 mr-2" />
                        フィルター
                    </Button>
                </div>
            </div>
            <hr className="border-t border-gray-200 mb-6" />
        </>
    )
}