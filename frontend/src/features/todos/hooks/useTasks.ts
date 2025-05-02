import { useState } from "react"
import { Task } from "../type"
import { search, updateTaskStatus, TodoResponse } from "../api/todoService";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    const fetchAllTasksFromRemote = async () => {
        const [notStarted, inProgress, completed] = await Promise.all([
          search({ status: "not_started" }),
          search({ status: "in_progress" }),
          search({ status: "completed" }),
        ]);
        setTasks([
          ...mapSearchResponsesToTasks(notStarted),
          ...mapSearchResponsesToTasks(inProgress),
          ...mapSearchResponsesToTasks(completed),
        ]);
      };
    
    const getTasksByStatus = (status: Task["status"]) => {
        return tasks.filter((task) => task.status === status);
    };

    const completeTask = async (taskId: string) => {
        setTasks ((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: "completed" } : task
            )
        );

        try {
            await updateTaskStatus(taskId, "completed");
        } catch (err) {
            console.log("failed to update: ", err);
        }
    }

    const moveTask = async (taskId: string, newStatus: Task["status"]) => {
        setTasks ((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );

        try {
            await updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.log("failed to update: ", err);
        }
    }

    const addNewTask = (status: Task["status"]) => {
        console.log(`add new task to ${status}`)
    }

    const getLocalTasksByStatus = (status: Task["status"]): Task[] => {
        return tasks.filter((task) => task.status === status);
    };

    // const getTaskCountByStatus = async (status: Task["status"]): Promise<number> => {
    //     const tasks = await getTasksByStatus(status)
    //     return tasks.length
    // }

    return {
        tasks,
        fetchAllTasksFromRemote,
        getTasksByStatus,
        completeTask,
        moveTask,
        addNewTask,
        getLocalTasksByStatus,
        // getTaskCountByStatus,
    }
}

export const mapSearchResponseToTask = (res: TodoResponse): Task => {
    return {
        id: res.id,
        userId: res.user_id,
        title: res.title,
        body: res.body ?? "",
        status: res.status,
        dueDate: res.due_date ? new Date(res.due_date) : undefined,
        completedAt: res.completed_at ? new Date(res.completed_at) : undefined,
        createdAt: new Date(res.created_at),
        updatedAt: new Date(res.updated_at),
    };
};

export const mapSearchResponsesToTasks = (resList: TodoResponse[]): Task[] => {
    return resList.map(mapSearchResponseToTask);
};