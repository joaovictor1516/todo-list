import { UserDbDto } from "../../../../../packages/schemas/userInterfaces";
import { TaskDbDto } from "../../../../../packages/schemas/taskInterfaces";
import { jest } from "@jest/globals";

interface UserRepositoryMockInterface {
    getUserTasks: (id: string) => Promise<TaskDbDto | null>;
    getUserById: (id: string) => Promise<UserDbDto | null>;
};

export const userRepositoryMock = (): jest.Mocked<UserRepositoryMockInterface> => ({
    getUserTasks: jest.fn(),
    getUserById: jest.fn(),
});