import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from "../api/task.api";
import type { TaskService, TaskInterface } from "../../../../packages/schemas/taskInterfaces";

export async function getTaskService(): Promise<TaskService<TaskInterface[]>>{
    try{
        const tasks: TaskInterface[] = await getTasksApi();
        return {
            data: tasks,
            message: "tasks_taked"
        }
    }
    catch(error){
        let errorMessage = "fail_take_taskes";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return{
            data: null,
            error: errorMessage,
        }
    }
}

export async function createTaskService(task: TaskInterface): Promise<TaskService<TaskInterface>>{
    try{
        const  newTask: TaskInterface = await createTaskApi(task);
        return {
            data: newTask,
            message: "task_created"
        };
    }
    catch(error){
        let errorMessage = "fail_task_creat";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function updateTaskService(taskId: string, task: TaskInterface): Promise<TaskService<TaskInterface>>{
    try{
        const taskUpdated: TaskInterface = await updateTaskApi(taskId, task);
        return{
            data: taskUpdated,
            message: "task_updated"
        }
    }
    catch(error){
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

export async function deleteTaskService(taskId: string): Promise<TaskService<null>>{
    try{
        await deleteTaskApi(taskId);
        return {
            data: null,
            message: "task_deleted"
        }
    }
    catch(error){
        let errorMessage = "error_task_delet";

        if(error instanceof Error){
            errorMessage = error.message;
        }

        return {
            data: null,
            error: errorMessage
        }
    }
}