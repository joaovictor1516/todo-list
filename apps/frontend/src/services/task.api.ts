import type { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { api } from "./axios";

export async function getTaskApi(){
    api.get("/task")
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
}

export async function createTaskApi(task: TaskInterface){
    api.post("/task", {
        task: task
    })
}

export async function updateTaskApi(taskId: string){
    api.put("", {
        taskId: taskId
    })
}

export async function deleteTaskApi(taskId: string){
    api.delete("", {
        data: taskId
    })
}