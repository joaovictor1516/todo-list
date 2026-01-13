import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { env } from "./envSchema";
import jwt from "@fastify/jwt";

const fastify = Fastify();

fastify.register(jwt, {
    secret: "algo"
});

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return reply.status(401).send({
            message: env.JWT_SECRET
        });
    }

    const [type, token]: string[] | undefined = authHeader.split(" ");

    if(type !== "Bearner" || !token){
        return reply.status(401).send({
            message: "Token invalid format"
        });
    }

    return reply.status(200)
}