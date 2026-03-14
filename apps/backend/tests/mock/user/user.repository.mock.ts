import { jest } from "@jest/globals";

export const userREpositoryMocl = () => ({
    findByEmail: jest.fn(),
    findByid: jest.fn(),
    create: jest.fn(),
});