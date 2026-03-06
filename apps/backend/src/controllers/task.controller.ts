import { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { TaskService} from "../service/task.service";

export class TaskController{
    constructor(private taskService: TaskService){}
    
    async createTask(request: FastifyRequest<
        {
            Body: TaskInterface
        }
    >, resply: FastifyReply) {
        const newTask = request.body;
        const task = await this.taskService.createTask(newTask);

        resply.code(201).send(task);
    }

    async getTasks(request: FastifyRequest, reply: FastifyReply) {
        const tasks = await this.taskService.getTasks();

        reply.code(201).send(tasks);
    }

    async getTaskById(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
        >, reply: FastifyReply) {
        const task = await this.taskService.getTaskById(reply.request.id);

        return reply.code(201).send(task);
    }

    async updateTask(request: FastifyRequest<
    {
        Params: {
            id: string
        },
        Body: TaskInterface
    }
    >, reply: FastifyReply) {
        const id = request.params.id;
        const newTaskVersion = request.body;

        if (id !== newTaskVersion.id) {
            return reply.code(404).send({
                message: "Task not find"
            });
        }

        const task = await this.taskService.updateTask(id, newTaskVersion);

        return reply.code(201).send(task);
    }

    async checkTask(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
        >, reply: FastifyReply){
        const id = request.params.id;

        const task = await this.taskService.completTask(id);

        return reply.code(201).send(task);
    }

    async deleteTask(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply) {

        const taskWasDeleted = await this.taskService.deleteTask(request.params.id);

        const message = taskWasDeleted ? "Task delete successful." : "Task don't exist.";

        return reply.code(201).send({
            message
        });
    }
}