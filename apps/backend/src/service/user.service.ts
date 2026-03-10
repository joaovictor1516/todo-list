import { UserDbDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
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

    async updateUser(id: string, user: UserInputDto): Promise<UserDbDto>{
        await this.getUserInformations(id);
        const userUpdated = await this.userRepository.updateUser(id, user);

        return userUpdated;
    }

    async updateUserPoint(id: string, pointsEarned: number): Promise<UserDbDto>{
        const user = await this.getUserInformations(id);

        const userNewPoint = user.points + pointsEarned;

        const userUpdatedPoint = await this.userRepository.updatePoint(id, userNewPoint);

        return userUpdatedPoint;
    }
}