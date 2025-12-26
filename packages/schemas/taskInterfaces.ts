import z from "zod";

export const taskType = z.object({
    id: z.uuid(),
    title: z.string().min(5),
    content: z.string().min(5),
    isCompleted: z.boolean()
});

export type TaskInterface = z.infer<typeof taskType>;

export interface TaskProps extends TaskInterface{
    deleteTask?: (taskId: string) => void;
    updateTask?: (taskId: string) => void;
    completeTask?: (taskId: string) => void;
};

export interface NewTaskInterface{
    createTask: (data: TaskInterface) => void;
};