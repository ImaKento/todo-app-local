import { Input } from "@/components/ui/input"
import { SearchTodoParams } from "../../schemas/TodoSchema"
import { Label } from "@/components/ui/label"

export const SearchColumn = ({
    searchParams,
    setSearchParams,
}: {
    searchParams: SearchTodoParams
    setSearchParams: (params: SearchTodoParams) => void
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSearchParams({
            ...searchParams,
            [name]: value,
        })
    }

    return (
        <div className="flex flex-wrap items-end gap-6 mb-6 justify-start">
            {/* タイトル */}
            <div className="flex flex-col gap-y-1 min-w-[250px]">
                <Label htmlFor="title">タイトル</Label>
                <Input
                    name="title"
                    placeholder="タイトル"
                    value={searchParams.title ?? ""}
                    onChange={handleChange}
                />
            </div>

            {/* 内容 */}
            <div className="flex flex-col gap-y-1 min-w-[250px]">
                <Label htmlFor="body">内容</Label>
                <Input
                    name="body"
                    placeholder="内容"
                    value={searchParams.body ?? ""}
                    onChange={handleChange}
                />
            </div>

            {/* 期限 */}
            <div className="flex flex-col gap-y-1 min-w-[300px]">
                <Label htmlFor="due_from">期限</Label>
                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        name="due_from"
                        value={searchParams.due_from ?? ""}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <span className="text-gray-500">〜</span>
                    <Input
                        type="date"
                        name="due_to"
                        value={searchParams.due_to ?? ""}
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}