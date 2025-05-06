import { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DeleteTodoDialog({
    todoId,
    onDelete,
}: {
    todoId: string
    onDelete: (todoId: string) => void
}) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(true)
                    }}
                >
                    削除！
                </Button>
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>
                        本当に削除しますか？
                    </DialogTitle>
                    <DialogDescription>
                        この操作はもとに戻せません
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        キャンセル
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onDelete(todoId)
                            setOpen(false)
                        }}
                    >
                        削除する
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}