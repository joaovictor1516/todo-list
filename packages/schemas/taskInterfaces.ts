import z from "zod";

const taskPublic = z.object({
    id: z.uuid(),
    title: z.string().min(3),
    content: z.string().min(5),
    createdAt: z.date().nullish(),
    eventDate: z.date().nullish(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    isCompleted: z.boolean().default(false)
});

const taskInput = z.object({
    title: z.string().min(3),
    content: z.string().min(5),
    eventDate: z.date().nullish(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
    iscompleted: z.boolean().default(false)
});

const taskDb = z.object({
    id: z.uuid,
    title: z.string().min(5)
});

export type TaskInterface = z.infer<typeof taskPublic>;
export type TaskInputDto = z.infer<typeof taskInput>;
export type TaskDbDto = z.infer<typeof taskDb>;

export interface TaskProps extends TaskInterface{
    deleteTask?: (taskId: TaskInterface["id"]) => void;
    updateTask?: (taskId: TaskInterface["id"]) => void;
    completeTask?: (taskId: TaskInterface["id"]) => void;
};

export interface NewTaskInterface{
    createTask: (data: TaskInputDto) => void;
};