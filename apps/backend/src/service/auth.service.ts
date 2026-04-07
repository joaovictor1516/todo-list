import { UserDbDto, UserLoginDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
import { UserRepository } from "../repository/user.repository";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export class AuthService{
    constructor(private userRepository: UserRepository){}

    async register(user: UserInputDto):Promise<UserDbDto>{
        const userExist = await this.userRepository.getUserByEmail(user.email);

        if(userExist){
            throw new Error("The user alwere exist.");
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

    async login(user: UserLoginDto):Promise<UserDbDto>{
        const userDataBase = await this.userRepository.getUserByEmail(user.email);

        if(!userDataBase){
            throw new Error("Invalid credentials.");
        }
        
        const isValid = await bcrypt.compare(user.password, userDataBase.passwordHash);

        if(!isValid){
            throw new Error("Invalid credentials.");
        }

        return userDataBase;
    }

    async delete(id: string, password: string):Promise<boolean>{
        const user = await this.userRepository.getUserById(id);

        if(!user){
            throw new Error("User dont exist.");
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if(!isValid){
            throw new Error("Wrong password.");
        }

        return await this.userRepository.deleteUser(id);
    }
}