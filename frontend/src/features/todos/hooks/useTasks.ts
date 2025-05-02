import { useState } from "react"
import { Task } from "../type"

export const useTasks = (initialTasks: Task[] = []) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    const completeTask = (taskId: string) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "完了" } : task)))
    }

    const moveTask = (taskId: string, newStatus: Task["status"]) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
    }

    const addNewTask = (status: Task["status"]) => {
        console.log(`add new task to ${status}`)
    }

    const getTasksByStatus = (status: Task["status"]): Task[] => {
        return tasks.filter((task) => task.status === status)
    }

    const getTaskCountByStatus = (status: Task["status"]): number => {
        return getTasksByStatus(status).length
    }

    return {
        tasks,
        completeTask,
        moveTask,
        addNewTask,
        getTasksByStatus,
        getTaskCountByStatus,
    }
}