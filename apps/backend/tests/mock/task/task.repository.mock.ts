import { TaskDbDto, TaskInterface } from "../../../../../packages/schemas/taskInterfaces";
import { jest } from "@jest/globals";

interface TaskRepositoryMockInterface {
    createTask: (task: TaskInterface) => Promise<TaskDbDto>;
    getTasks: () => Promise<TaskDbDto[]>;
    getTaskById: (id: string) => Promise<TaskDbDto>;
    checkTask: (id: string) => Promise<TaskDbDto>;
};

export const taskRepositoryMock = (): jest.Mocked<TaskRepositoryMockInterface> => ({
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    checkTask: jest.fn()
});