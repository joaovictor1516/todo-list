import { TaskDbDto } from "../../../../../packages/schemas/taskInterfaces";
import { randomUUID } from "node:crypto";

export const taskDataMock = (overrides: Partial<TaskDbDto> = {}): TaskDbDto => ({
    id: "1",
    title: "Estudar Programcao",
    content: "Estudar estrutura de dados.",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    eventDate: new Date("2024-01-01T00:00:00.000Z"),
    lastUpdate: new Date("2024-01-01T00:00:00.000Z"),
    isCompleted: false,
    priority: "high",
    userId: "1",
    ...overrides
});

export const taskIntegrationDataMock = (overrides: Partial<TaskDbDto> = {}): TaskDbDto => ({
    id: randomUUID(),
    title: "Estudar Programcao",
    content: "Estudar estrutura de dados.",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    eventDate: new Date("2024-01-01T00:00:00.000Z"),
    lastUpdate: new Date("2024-01-01T00:00:00.000Z"),
    isCompleted: false,
    priority: "high",
    userId: randomUUID(),
    ...overrides
})