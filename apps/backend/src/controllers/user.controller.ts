import { UserInterface, UserDbDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
import { TaskDbDto } from "../../../../packages/schemas/taskInterfaces";
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

    async updateUser(request: FastifyRequest<
            {
                Body: UserInputDto,
                Params: {
                    id: string
                }
            }
        >, reply: FastifyReply){
            const id = request.params.id;
            const userInformations = request.body;
            const userUpdated = await this.userService.userUpdate(id, userInformations);

            return reply.code(201).send(userUpdated);
        }
}