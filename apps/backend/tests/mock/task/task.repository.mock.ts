import { TaskRepository } from "../../../src/repository/task.repository";
import { jest } from "@jest/globals";

export const taskRepositoryMock = (): jest.Mocked<TaskRepository> => ({
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    checkTask: jest.fn(),
    deleteTask: jest.fn()
});