import { TaskDbDto, TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { TaskRepository } from "../repository/task.repository";

export class TaskService{
    constructor(private taskRepository: TaskRepository){}

    async createTask(task: TaskInterface):Promise<TaskDbDto>{
        return await this.taskRepository.createTask(task);
    }

    async getTask():Promise<TaskDbDto[] | string>{
        const tasks = await this.taskRepository.getTasks();

        if(tasks === undefined){
            return "Tasks dont exist.";
        }

        return tasks
    }

    async getTaskById(id: string):Promise<TaskDbDto | string>{
        const task = await this.taskRepository.getTaskById(id);

        if(task === undefined){
            return "Task dont exist.";
        }

        return task;
    }

    async updateTask(id: string, task: TaskInterface):Promise<TaskDbDto>{
        const  taskExist =  await  this.taskRepository.getTaskById(id);

        if(taskExist === undefined){
            return await this.createTask(task);
        }

        return await this.taskRepository.updateTask(id, task);
    }

    async completTask(id: string):Promise<TaskDbDto | string>{
        const task = await this.getTaskById(id);
        
        if(typeof(task) === "string"){
            return task; 
        }

        task.isCompleted = true;

        return await this.updateTask(id, task);
    }

    async deleteTask(id: string): Promise<boolean | string>{
        const task = await this.getTaskById(id);

        if(typeof(task) === "string"){
            return task;
        }

        return await this.taskRepository.deleteTask(id);
    }
}