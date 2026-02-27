import { z } from "zod";

export const userPublicDto = z.object({
    id: z.uuid(),
    name: z.string().min(3),
    email: z.email(),
    points: z.number().default(0),
    createdAt: z.date()
});

export const userInputsDto = z.object({
    name: z.string().min(3),
    password: z.string().min(8),
    email: z.email()
});

export const userDbDto = z.object({
    id: z.uuid(),
    name: z.string().min(3),
    email: z.email(),
    passwordHash: z.string(),
    points: z.number().default(0),
    createdAt: z.date()
});

export type UserInterface = z.infer<typeof userPublicDto>

export interface NewUserInterface{
 newUser: (data: typeof userInputsDto) => void; 
};