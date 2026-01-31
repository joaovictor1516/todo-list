import { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createTask(request: FastifyRequest<
        {
            Body: {
                task: TaskInterface
            }
        }
    >, resply: FastifyReply){
        const task = request.body.task;

        resply.code(201).send({task});
}

export async function getTasks(request: FastifyRequest<
        {
            Body: {
                tasks: TaskInterface[]
            }
        }
    >, reply: FastifyReply) {
        const tasks = request.body.tasks;

        reply.code(201).send(tasks);
}

export async function deleteTask(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply){
        const id = request.params.id;

        reply.code(201);
}

export async function getTaskById(request: FastifyRequest<
        {
            Params: {
                id: string
            }    
        }
    >, reply: FastifyReply){

        const id = request.params.id;

        reply.code(201);

}

export async function updateTask(request: FastifyRequest<
        {
            Params: { 
                id: string 
            },
            Body: {
                task: TaskInterface
            }
        }
    >, reply: FastifyReply){

        const id = request.params.id;
        const task = request.body.task;

        if(id !== task.id){
            return reply.code(400).send({
                message: "Task not find"
            });
        }
}