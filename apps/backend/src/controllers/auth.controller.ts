import { UserInputDto, UserLoginDto } from "../../../../packages/schemas/userInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../service/auth.service";

export class AuthController{
    async authCreateUser(request: FastifyRequest, reply: FastifyReply) {
        const userTaked = request.body as UserInputDto;
        const authService = new AuthService();
        const user = await authService.register(userTaked);

        reply.code(201).send(user);
    }

    async authLoginUser(request: FastifyRequest, reply: FastifyReply){
        const loginUserInformations = request.body as UserLoginDto;
        const authService = new AuthService();
        const user = await authService.login(loginUserInformations);

        reply.code(201).send(user);
    }
}
