import { UserRepositoryInterface } from "../../../../../packages/schemas/userInterfaces";
import { jest } from "@jest/globals";

export const userRepositoryMock = (): jest.Mocked<UserRepositoryInterface> => ({
    getUserByEmail: jest.fn(),
    getUserTasks: jest.fn(),
    getUserById: jest.fn(),
    updatePoint: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUsers: jest.fn()
});