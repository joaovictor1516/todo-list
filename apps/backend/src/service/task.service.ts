import { TaskDbDto, TaskInterface, TaskRepositoryInterface } from "../../../../packages/schemas/taskInterfaces";

export class TaskService{
    constructor(private taskRepository: TaskRepositoryInterface){}

    async createTask(task: TaskInterface):Promise<TaskDbDto>{
        return await this.taskRepository.createTask(task);
    }

    async getTasks():Promise<TaskDbDto[]>{
        return await this.taskRepository.getTasks();
    }

    async getTaskById(id: string):Promise<TaskDbDto>{
        const task = await this.taskRepository.getTaskById(id);

        if(!task){
            throw new Error("Task don't exist.");
        }

        return task;
    }

    async updateTask(id: string, task: TaskInterface):Promise<TaskDbDto>{
        const  taskExist =  await this.getTaskById(id);
        
        if (taskExist.isCompleted === true){
            throw new Error("Task is already completed.");
        }

        return await this.taskRepository.updateTask(id, task);
    }

    async completTask(id: string):Promise<TaskDbDto>{
        const task = await this.getTaskById(id);

        if(task.isCompleted === true){
            throw new Error("Task is already completed.");
        }

        return await this.taskRepository.checkTask(id);
    }

    async deleteTask(id: string): Promise<boolean>{
        const task = await this.getTaskById(id);

        return await this.taskRepository.deleteTask(task.id);
    }
}