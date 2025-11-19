import { TaskInterface } from "./taskInterfaces";

export interface UserInterface{
    id: string;
    userName: string;
    email: string;
    points: number;
    todoList: TaskInterface[];
}

export interface NewUserInterface{
 newUser: (data: UserInterface) => void; 
}