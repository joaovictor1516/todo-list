import type { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { api } from "./axios";

export async function getTasksApi(): Promise<TaskInterface[]>{
    const response = await api.get("/task");

    return response.data.tasks as TaskInterface[];
}

export async function createTaskApi(task: TaskInterface): Promise<TaskInterface>{
    const response = await api.post("/task", {
        task: task
    });

    return response.data.task as TaskInterface;
}

export async function updateTaskApi(taskId: TaskInterface["id"], task: TaskInterface): Promise<TaskInterface>{
    const response = await api.put(`/task/${taskId}`, {
        taskId,
        task
    });

    return response.data.task as TaskInterface;
}

export async function deleteTaskApi(taskId: TaskInterface["id"]): Promise<void>{
    await api.delete(`/task/${taskId}`);
}