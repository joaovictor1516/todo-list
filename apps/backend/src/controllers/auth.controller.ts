import { UserInputDto, UserLoginDto } from "../../../../packages/schemas/userInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../service/auth.service";

export class AuthController{
    constructor(private authService: AuthService){}

    async authCreateUser(request: FastifyRequest, reply: FastifyReply) {
        const userTaked = request.body as UserInputDto;
        const user = await this.authService.register(userTaked);

        reply.code(201).send(user);
    }

    async authLoginUser(request: FastifyRequest, reply: FastifyReply){
        const loginUserInformations = request.body as UserLoginDto;
        const user = await this.authService.login(loginUserInformations);

        reply.code(200).send(user);
    }
}