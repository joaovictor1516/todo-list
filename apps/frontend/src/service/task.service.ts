import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from "../api/task.api";
import type { TaskService, TaskInterface } from "../../../../packages/schemas/taskInterfaces";

export async function getTasksService(): Promise<TaskService<TaskInterface[]>>{
    try{
        const tasks: TaskInterface[] = await getTasksApi();
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

export async function createTaskService(task: TaskInterface): Promise<TaskService<TaskInterface>>{
    try{
        const  newTask: TaskInterface = await createTaskApi(task);
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

export async function updateTaskService(taskId: TaskInterface["id"], task: TaskInterface): Promise<TaskService<TaskInterface>>{
    try{
        const taskUpdated: TaskInterface = await updateTaskApi(taskId, task);
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

export async function deleteTaskService(taskId: TaskInterface["id"]): Promise<TaskService<null>>{
    try{
        await deleteTaskApi(taskId);
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