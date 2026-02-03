import z from "zod";

export const taskType = z.object({
    id: z.uuid(),
    title: z.string().min(5),
    content: z.string().min(5),
    isCompleted: z.boolean()
});

export type TaskInterface = z.infer<typeof taskType>;

export interface TaskProps extends TaskInterface{
    deleteTask?: (taskId: TaskInterface["id"]) => void;
    updateTask?: (taskId: TaskInterface["id"]) => void;
    completeTask?: (taskId: TaskInterface["id"]) => void;
};

export interface NewTaskInterface{
    createTask: (data: TaskInterface) => void;
};

export interface TaskService<T>{
    data: T | null,
    message?: string,
    error?: string
};