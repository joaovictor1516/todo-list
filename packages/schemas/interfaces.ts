export interface Todo{
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
}

export interface User{
    id: string;
    userName: string;
    email: string;
    points: number;
    todoList: Todo[];
}