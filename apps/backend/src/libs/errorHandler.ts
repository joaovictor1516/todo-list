import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";

export function errorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply){
    if(error instanceof ZodError){
        return reply.code(400).send({
            message: "Type error",
            issues: error.issues
        });
    } else if(error instanceof Error){
        return reply.code(400).send({
            message: error.message
        });
    } else {
        return reply.code(500).send({
            message: "Internal error"
        });
    }
}