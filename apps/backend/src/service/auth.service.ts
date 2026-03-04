import { randomUUID } from "crypto";
import { UserDbDto, UserLoginDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcryptjs";

export class AuthService{
    constructor(private userRepository: UserRepository){}

    async register(user: UserInputDto):Promise<UserDbDto | string>{
        const userExist = await this.userRepository.getUserByEmail(user.email);

        if(userExist !== undefined){
            return "The user alwere exist.";
        }

        const hashPassword = await bcrypt.hash(user.password, 10);

        const newUser: UserDbDto = {
            id: randomUUID(),
            name: user.name,
            email: user.email,
            passwordHash: hashPassword,
            points: 0,
            createdAt: new Date(),
        };

        return await this.userRepository.createUser(newUser);
    }

    async login(user: UserLoginDto):Promise<UserDbDto | string>{
        const userDataBase = await this.userRepository.getUserByEmail(user.email);

        if(userDataBase === undefined){
            return "Invalid credentials.";
        }
        
        const isValid = await bcrypt.compare(user.password, userDataBase.passwordHash);

        if(isValid === false){
            return "Invalid credentials.";
        }

        return userDataBase;
    }
}