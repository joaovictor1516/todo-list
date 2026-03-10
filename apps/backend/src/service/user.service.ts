import { UserDbDto } from "../../../../packages/schemas/userInterfaces";
import { TaskDbDto } from "../../../../packages/schemas/taskInterfaces";
import { UserRepository } from "../repository/user.repository";

export class UserService{
    constructor(private userRepository: UserRepository){}    

    async getUserInformations(id: string): Promise<UserDbDto>{
        const userInformarions = await this.userRepository.getUserById(id);

        if(!userInformarions){
            throw new Error("User not founded.");
        }

        return userInformarions;
    }

    async getUserTasks(id: string): Promise<TaskDbDto[]>{
        await this.getUserInformations(id);

        const userTasks= await this.userRepository.getUserTasks(id);

        return userTasks;
    }
}