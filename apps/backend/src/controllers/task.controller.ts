import { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";

export async function createTask(request: FastifyRequest, resply: FastifyReply){
    const task = request.body;

    resply.code(201).send({task});
}

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {

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
            reply.code(400).send({
                message: "Task not find"
            });
        }
}