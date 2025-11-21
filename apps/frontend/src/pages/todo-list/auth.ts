import type { NewTaskInterface, TaskInterface } from "../../../../../packages/schemas/taskInterfaces";

export function authNewTask(newTask: NewTaskInterface){
    try {
        newTask.createTask(task);
    } catch(error) {
        console.error(error);
    }
}