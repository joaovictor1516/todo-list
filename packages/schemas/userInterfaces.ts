import { taskType } from "./taskInterfaces";
import { z } from "zod";

export const userType = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    points: z.number(),
    todoList: z.array(taskType)
})

export type UserInterface = z.infer<typeof userType>;

export interface NewUserInterface{
 newUser: (data: UserInterface) => void; 
}