import { useState } from "react"
import { Task } from "../type"
import { search } from "../api/todoService";
import { SearchResponse } from "../api/todoService";

export const useTasks = (initialTasks: Task[] = []) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    const completeTask = (taskId: string) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))
    }

    const moveTask = (taskId: string, newStatus: Task["status"]) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
    }

    const addNewTask = (status: Task["status"]) => {
        console.log(`add new task to ${status}`)
    }

    const getTasksByStatus = async (status: Task["status"]): Promise<Task[]> => {
        const res = await search({ status });
        return mapSearchResponsesToTasks(res);
    }

    // const getTaskCountByStatus = async (status: Task["status"]): Promise<number> => {
    //     const tasks = await getTasksByStatus(status)
    //     return tasks.length
    // }

    return {
        tasks,
        completeTask,
        moveTask,
        addNewTask,
        getTasksByStatus,
        // getTaskCountByStatus,
    }
}

export const mapSearchResponseToTask = (res: SearchResponse): Task => {
    return {
        id: res.id,
        userId: res.userId,
        title: res.title,
        body: res.body ?? "",
        status: res.status,
        dueDate: res.dueDate ? new Date(res.dueDate) : undefined,
        completedAt: res.completedAt ? new Date(res.completedAt) : undefined,
        createdAt: new Date(res.createdAt),
        updatedAt: new Date(res.updatedAt),
    };
};

export const mapSearchResponsesToTasks = (resList: SearchResponse[]): Task[] => {
    return resList.map(mapSearchResponseToTask);
};