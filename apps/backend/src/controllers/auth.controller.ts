import { UserInterface } from "../../../../packages/schemas/userInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../service/auth.service";

export async function authCreateUser(request: FastifyRequest, reply: FastifyReply){
    const userTaked = request.body as UserInterface;
    const authService = new AuthService();
    const user = await authService.register(userTaked);

    reply.code(201).send(user);
}