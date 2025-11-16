export interface TaskInterface{
    taskId: string;
    title: string;
    content: string;
    isComplited: boolean;
}

export interface UserInterface{
    userId: string;
    userName: string;
    tasks: TaskInterface[];
    points: number;
}