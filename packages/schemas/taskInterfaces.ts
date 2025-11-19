export interface TaskInterface{
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
}

export interface NewTaskInterface{
    createTask: (data: TaskInterface) => void;
}