import z from "zod";

export const taskPublicDto = z.object({
    id: z.uuid(),
    title: z.string().min(3),
    content: z.string().min(5),
    createdAt: z.date().nullish(),
    eventDate: z.date().nullish(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    isCompleted: z.boolean().default(false)
});

export const taskInputDto = z.object({
    title: z.string().min(3),
    content: z.string().min(5),
    eventDate: z.date().nullish(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    iscompleted: z.boolean().default(false)
});

export type TaskInterface = z.infer<typeof taskPublicDto>;

export interface TaskProps extends TaskInterface{
    deleteTask?: (taskId: TaskInterface["id"]) => void;
    updateTask?: (taskId: TaskInterface["id"]) => void;
    completeTask?: (taskId: TaskInterface["id"]) => void;
};

export interface NewTaskInterface{
    createTask: (data: typeof taskInputDto) => void;
};