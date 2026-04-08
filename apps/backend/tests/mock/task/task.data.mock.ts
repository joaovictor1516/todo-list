import { TaskDbDto, TaskInputDto } from "../../../../../packages/schemas/taskInterfaces";
import { jest } from "@jest/globals";

export const taskDataMock = (overrides: Partial<TaskDbDto> = {}): TaskDbDto => ({
    id: "1",
    title: "Estudar Programcao",
    content: "Estudar estrutura de dados.",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    eventDate: new Date("2024-01-01T00:00:00.000Z"),
    lastUpdate: new Date("2024-01-01T00:00:00.000Z"),
    isCompleted: false,
    priority: "high",
    ...overrides
});

export const newTaskDataMock = (overrides: Partial<TaskInputDto> = {}): TaskInputDto => ({
    title: "Ir para academia",
    content: "Melhorar a saude",
    priority: "high",
    eventDate: new Date("2024-02-01T00:00:00.000Z"),
    ...overrides
});