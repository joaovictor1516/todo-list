import { getTaskApi, createTaskApi, updateTaskApi, deleteTaskApi } from "../api/task.api";
import { type TaskInterface } from "../../../../packages/schemas/taskInterfaces";

export async function getTaskService() {
    try{
        const tasks: TaskInterface[] = await getTaskApi();
        return tasks;
    }
    catch(error){
        console.error(error);
        return "Nenhuma task encontrada.";
    }
};

export async function createTaskService(task: TaskInterface){
    try{
        const  newTask: TaskInterface = await createTaskApi(task);
        return {
            newTask,
            message: "Tarefa criada com sucesso."
        };
    }
    catch(error){
        console.error(error);
        return "Falha ao criar a tarefa.";
    }
};

export async function updateTaskService(taskId: string, task: TaskInterface){
    try{
        const taskUpdated: TaskInterface = await updateTaskApi(taskId, task);
        return{
            taskUpdated,
            message: "Tarefa atualizada com sucesso."
        };
    }
    catch(error){
        console.error(error);
        return "Falha ao atualizar a tarefa.";
    }
};

export async function deleteTaskService(taskId: string){
    try{
        await deleteTaskApi(taskId);
        return "Tarefa removida com sucesso.";
    }
    catch(error){
        console.error(error);
        return "Falha ao remover a tarefa.";
    }
};