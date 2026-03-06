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

    async deleteTask(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply) {
        const id = request.params.id;

        reply.code(201);
    }

    async getTaskById(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply) {

        const id = request.params.id;
        const task = await this.taskService.getTaskById(id);

        if(!task){
            return reply.code(400).send({message: "Task bot founded."});
        }

        reply.code(201).send(task);

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
        const task = request.body;

        if (id !== task.id) {
            return reply.code(400).send({
                message: "Task not find"
            });
        }
    }
}