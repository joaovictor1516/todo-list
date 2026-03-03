import { UserInputDto, UserLoginDto } from "../../../../packages/schemas/userInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../service/auth.service";

export class AuthController{
    constructor(private authService: AuthService){}

    async authCreateUser(request: FastifyRequest<
            {
                Body: UserInputDto
            }
        >, reply: FastifyReply) {
        const userTaked = request.body;
        const user = await this.authService.register(userTaked);

        reply.code(201).send(user);
    }

    async authLoginUser(request: FastifyRequest<
            {
                Body: UserLoginDto
            }
        >, reply: FastifyReply){
        const loginUserInformations = request.body;
        const user = await this.authService.login(loginUserInformations);

        reply.code(200).send(user);
    }
}