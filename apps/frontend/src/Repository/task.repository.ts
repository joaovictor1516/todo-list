import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from "../api/task.api";
import type { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import type { taskRepository } from "../../../../packages/schemas/apiInterfaces";

export class OffLineTaskRepository implements taskRepository{
    async getAll(): Promise<TaskInterface[]> {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    }

    async create(task: TaskInterface): Promise<TaskInterface> {
        const tasks = await this.getAll();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return task;
    }

    async update(id: string, task: TaskInterface): Promise<TaskInterface> {
        const tasks = await this.getAll();
        const taskIndex = tasks.findIndex((task) => task.id === id);
        tasks[taskIndex] = task
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return task
    }

    async delete(id: string): Promise<void> {
        const tasks = await this.getAll();
        const newTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
}

export class OnLineTaskRepository implements taskRepository{
    async getAll():Promise<TaskInterface[]>{
        return getTasksApi();
    }

    async create(task: TaskInterface){
        return createTaskApi(task);
    }

    async update(id: string, task: TaskInterface){
        return updateTaskApi(id, task);
    }

    async delete(id: string){
        return deleteTaskApi(id);
    }
}