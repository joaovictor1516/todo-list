import { TaskDbDto, TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { TaskRepository } from "../repository/task.repository";

export class TaskService{
    constructor(private taskRepository: TaskRepository){}

    async createTask(task: TaskInterface):Promise<TaskDbDto>{
        return await this.taskRepository.createTask(task);
    }

    async getTasks():Promise<TaskDbDto[]>{
        return await this.taskRepository.getTasks();
    }

    async getTaskById(id: string):Promise<TaskDbDto>{
        const task = await this.taskRepository.getTaskById(id);

        if(!task){
            throw new Error("Task dont exist.");
        }

        return task;
    }

    async updateTask(id: string, task: TaskInterface):Promise<TaskDbDto>{
        const  taskExist =  await  this.taskRepository.getTaskById(id);

        if(!taskExist){
            throw new Error("Task dont exist.");
        }

        if (taskExist.isCompleted === true){
            throw new Error("Task is alwere completed.");
        }

        return await this.taskRepository.updateTask(id, task);
    }

    async completTask(id: string):Promise<TaskDbDto>{
        const task = await this.getTaskById(id);
        
        if(!task){
            throw new Error("Task dont exist.");
        }

        if(task.isCompleted === true){
            throw new Error("Task is alwere completed.");
        }

        return await this.taskRepository.checkTask(id);
    }

    async deleteTask(id: string): Promise<boolean>{
        const task = await this.getTaskById(id);

        if(!task){
            throw new Error("Task dont exist.");
        }

        return await this.taskRepository.deleteTask(id);
    }
}