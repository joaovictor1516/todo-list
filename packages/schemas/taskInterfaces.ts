export interface TaskInterface{
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
    deleteTask?: (taskId: string) => void;
    updateTask?: (taskId: string) => void;
    completeTask?: (taskId: string) => void;
}

export interface NewTaskInterface{
    createTask: (data: TaskInterface) => void;
}