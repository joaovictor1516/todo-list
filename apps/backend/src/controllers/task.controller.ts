import { FastifyRequest, FastifyReply } from "fastify";

export async function createTask(request: FastifyRequest, resply: FastifyReply){
    const task = request.body;

    resply.code(201).send({task});
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply){

}

export async function getTasks(request: FastifyRequest, reply: FastifyReply){
    
}

export async function getTaskById(request: FastifyRequest, reply: FastifyReply){
    
}