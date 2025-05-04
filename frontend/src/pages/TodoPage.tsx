import { useEffect, useState } from "react"
import { AppSidebar } from "@/shared/layout/AppSideBar"
import { NavActions } from "@/shared/nav/NavActions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import TodoList from "@/features/todos/components/list/TodoList"
import { useTodoContext } from "@/contexts/TodoContext"

export default function TodoPage() {
  const { todos, fetchAllTodos } = useTodoContext()
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await fetchAllTodos()
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <TodoList todos={todos} loading={loading}/>
      </SidebarInset>
    </SidebarProvider>
  )
}
