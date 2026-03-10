import { UserInterface, UserDbDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../service/user.service";

export class UserController {
    constructor(private userService: UserService){}

    async getUserInformations(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply) {
        const id = request.params.id;
        const userInformations = await this.userService.getUserInformations(id);

        return reply.code(200).send(userInformations);
    }

    async getUserTasks(request: FastifyRequest<
        {
            Params: {
                id: string
            }
        }
    >, reply: FastifyReply){
        const id = request.params.id;
        const userTasks = await this.userService.getUserTasks(id);

        return reply.code(200).send(userTasks);
    }
}