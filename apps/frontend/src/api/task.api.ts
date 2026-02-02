import type { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { api } from "./axios";

export async function getTaskApi(): Promise<TaskInterface[]>{
    const response = await api.get("/task");

    return response.data.tasks as TaskInterface[];
}

export async function createTaskApi(task: TaskInterface): Promise<TaskInterface>{
    const response = await api.post("/task", {
        task: task
    });

    return response.data.task as TaskInterface;
}

export async function updateTaskApi(taskId: string, task: TaskInterface): Promise<TaskInterface>{
    const response = await api.put(`/task/${taskId}`, {
        taskId,
        task
    });

    return response.data.task as TaskInterface;
}

export async function deleteTaskApi(taskId: string): Promise<void>{
    await api.delete(`/task/${taskId}`);
}