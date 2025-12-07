export interface TaskInterface{
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
}

export interface TaskProps extends TaskInterface{
    deleteTask?: (taskId: string) => void;
    updateTask?: (taskId: string) => void;
    completeTask?: (taskId: string) => void;
}

export interface NewTaskInterface{
    createTask: (data: TaskInterface) => void;
}