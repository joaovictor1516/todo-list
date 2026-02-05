import { OffLineTaskRepository, OnLineTaskRepository } from "../Repository/task.repository";
import type { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import type { service } from "../../../../packages/schemas/apiInterfaces";

async function isConnected(): Promise<boolean>{
    if(!navigator.onLine){
        return false;
    }

    try{
        const response = await fetch("/tasks", {method: "HEAD", cache: "no-store"});
        return response.ok;
    }
    catch{
        return false;
    }
}

async function getTaskRepository(){
    const online = await isConnected();
    return online ? new OnLineTaskRepository() : new OffLineTaskRepository();
}

export async function getTasksService(): Promise<service<TaskInterface[]>>{
    try{
        const repository = await getTaskRepository();
        const tasks = await repository.getAll();

        return {
            data: tasks,
            message: "tasks_taked"
        }
        
    }
    catch(error: unknown){
        let errorMessage = "fail_take_tasks";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return{
            data: null,
            error: errorMessage,
        }
    }
}

export async function createTaskService(task: TaskInterface): Promise<service<TaskInterface>>{
    try{
        const repository = await getTaskRepository();
        const  newTask: TaskInterface = await repository.create(task);
        
        return {
            data: newTask,
            message: "task_created"
        };
    }
    catch(error: unknown){
        let errorMessage = "fail_task_create";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function updateTaskService(taskId: TaskInterface["id"], task: TaskInterface): Promise<service<TaskInterface>>{
    try{
        const repository = await getTaskRepository();
        const taskUpdated: TaskInterface = await repository.update(taskId, task);

        return{
            data: taskUpdated,
            message: "task_updated"
        }
    }
    catch(error: unknown){
        let errorMessage = "error_task_update";

        if(error instanceof Error){
            errorMessage = error.message;
        }
        
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function deleteTaskService(taskId: TaskInterface["id"]): Promise<service<null>>{
    try{
        const repository = await getTaskRepository();
        await repository.delete(taskId);
        
        return {
            data: null,
            message: "task_deleted"
        }
    }
    catch(error: unknown){
        let errorMessage = "error_task_delete";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return {
            data: null,
            error: errorMessage
        }
    }
}