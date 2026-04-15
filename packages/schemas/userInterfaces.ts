import { TaskDbDto } from "./taskInterfaces";
import { z } from "zod";

export const userPublic = z.object({
    id: z.uuid(),
    name: z.string().min(3),
    email: z.email(),
    points: z.number().default(0),
    createdAt: z.date()
});

export const userInput = z.object({
    name: z.string().min(3),
    password: z.string().min(8),
    email: z.email()
});

export const userLogin = z.object({
    email: z.email(),
    password: z.string().min(8)
});

const userDb = z.object({
    id: z.uuid(),
    name: z.string().min(3),
    email: z.email(),
    passwordHash: z.string(),
    points: z.number().default(0),
    createdAt: z.date()
});

export type UserInterface = z.infer<typeof userPublic>;
export type UserInputDto = z.infer<typeof userInput>;
export type UserLoginDto = z.infer<typeof userLogin>;
export type UserDbDto = z.infer<typeof userDb>

export interface NewUserInterface{
 newUser: (data: UserInputDto) => void; 
};

export interface UserRepositoryInterface{
    createUser: (user: UserDbDto) => Promise<UserDbDto>;
    getUsers: () => Promise<UserDbDto[]>;
    getUserById: (id: string) => Promise<UserDbDto | null>;
    getUserByEmail: (email: string) => Promise<UserDbDto | null>;
    getUserTasks: (id: string) => Promise<TaskDbDto[]>;
    updateUser: (id: string, user: UserInputDto) => Promise<UserDbDto>;
    updatePoint: (id: string, newUserPoints: number) => Promise<UserDbDto>;
    deleteUser: (id: string) => Promise<boolean>;
};