import { UserRepository } from "../../../src/repository/user.repository";
import { jest } from "@jest/globals";

export const userRepositoryMock = (): jest.Mocked<UserRepository> => ({
    getUserByEmail: jest.fn(),
    getUserTasks: jest.fn(),
    getUserById: jest.fn(),
    updatePoint: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUsers: jest.fn()
});