import { TaskInterface } from "../../../../packages/schemas/taskInterfaces";

export const task1: TaskInterface = {
    id: crypto.randomUUID(),
    title: "Teste 1",
    content: "Primeira task de teste.",
    isCompleted: false
};

export const task2: TaskInterface = {
    id: crypto.randomUUID(),
    title: "Teste 2",
    content: "Segunda task de teste.",
    isCompleted: false
};