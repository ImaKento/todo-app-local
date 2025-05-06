import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateTodo } from "../../hooks/useTodos";

export function CreateTodoDialog({
  trigger,
  status,
}: {
  trigger: React.ReactNode
  status: "not_started" | "in_progress" | "completed" | "deleted"
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>(status)
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, reset, errors, isSubmitting, onSubmit, error } = useCreateTodo(() => {setOpen(false)})

  useEffect(() => {
    if (open) {
      reset({
        title: "",
        body: "",
        due_date: undefined,
        status: status,
      })
      setSelectedStatus(status)
    }
  }, [open, status, reset])
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Todo 新規作成</DialogTitle>
          <DialogDescription>
            タスクを登録して整理しましょう
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">タイトル</Label>
              <Input 
                id="title"
                {...register("title")}
                className="col-span-3" 
              />
              {errors.title && (
                <p className="col-span-4 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body" className="text-right">内容</Label>
              <Input 
                id="body"
                {...register("body")}
                className="col-span-3" 
              />
              {errors.body && (
                <p className="col-span-4 text-sm text-red-500">{errors.body.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">期限</Label>
              <Input
                id="dueDate"
                type="date"
                {...register("due_date")}
                className="col-span-3"
              />
              {errors.due_date && (
                <p className="col-span-3 text-sm text-red-500">{errors.due_date.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">ステータス</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value: "not_started" | "in_progress" | "completed") => {
                  setSelectedStatus(value)
                  setValue("status", value, { shouldValidate: true })
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ステータス</SelectLabel>
                    <SelectItem value="not_started">未着手</SelectItem>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* エラーメッセージ */}
              {errors.status && (
                <p className="col-span-4 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <DialogFooter className="pt-2">
            <Button type="submit">
              {isSubmitting ? "作成中..." : "作成する"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
