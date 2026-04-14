import { TaskRepositoryInterface } from "../../../../../packages/schemas/taskInterfaces";
import { jest } from "@jest/globals";

export const taskRepositoryMock = ():jest.Mocked<TaskRepositoryInterface> => ({
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    checkTask: jest.fn(),
    deleteTask: jest.fn()
});