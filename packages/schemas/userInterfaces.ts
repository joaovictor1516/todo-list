import { taskType } from "./taskInterfaces";
import { z } from "zod";

export const userType = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    points: z.number(),
    todoList: z.array(taskType),
    authState: z.boolean(),
    authCode: z.string().optional()
});

export type UserInterface = z.infer<typeof userType>;

export interface NewUserInterface{
 newUser: (data: UserInterface) => void; 
}