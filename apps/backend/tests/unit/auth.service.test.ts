import { jest, test, expect, describe, beforeEach } from "@jest/globals";
import { userRepositoryMock } from "../mock/user/user.repository.mock";
import { UserRepository } from "../../src/repository/user.repository";
import { AuthService } from "../../src/service/auth.service";
import bcrypt from "bcryptjs";

describe("Auth service tests:", () => {
    let repository: jest.Mocked<UserRepository>;
    let service: AuthService;

    beforeEach(() => {
        repository = userRepositoryMock();
        service = new AuthService(repository);
    });

    test("Register a new user test:", async () => {
        const date = new Date();
        const password = "TEste@1234";
        const passwordHash = await bcrypt.hash(password, 10);

        repository.createUser.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: passwordHash,
            points: 0,
            createdAt: date
        });

        const result = await service.register({
            name: "Joao Victor",
            password: password,
            email: "jvcampos531@gmail.com"
        });

        expect(result).toEqual({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: passwordHash,
            points: 0,
            createdAt: date
        });

        expect(repository.createUser)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    name: "Joao Victor",
                    email: "jvcampos531@gmail.com",
                    id: expect.any(String),
                    passwordHash: expect.any(String)
                })
            );
    });

    test("Logn a user test:", async () => {
        const date = new Date();
        const password = "TEste@1234";
        const passwordHash = await bcrypt.hash(password, 10);

        repository.getUserByEmail.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: passwordHash,
            points: 0,
            createdAt: date
        });

        const result = await service.login({
            email: "jvcampos531@gmail.com", 
            password: password
        });

        expect(result).toEqual({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: passwordHash,
            points: 0,
            createdAt: date
        });

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("User alwere exist test:", async () => {
        const date = new Date();
        const password = "Teste@1234";
        const passwordHash = await bcrypt.hash(password, 10);

        repository.getUserByEmail.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: passwordHash,
            points: 0,
            createdAt: date
        });

        const result = service.register({
            name: "Joao Victor",
            password: password,
            email: "jvcampos531@gmail.com"
        });

        await expect(result)
            .rejects
            .toThrow("The user alwere exist.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Try to make a login to a user dont exist:", async () => {
        const password = "TEste@1234";

        repository.getUserByEmail.mockResolvedValue(null);

        const result = service.login({
            email: "jvcampos531@gmail.com",
            password: password
        });

        await expect(result)
            .rejects
            .toThrow("Invalid credentials.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Try to make login with wrong password", async () => {
        const password = "Teste@1234";
        const correctPassword = "TEste@1234";
        const correctPasswordHash = await bcrypt.hash(correctPassword, 10);
        const date = new Date();

        repository.getUserByEmail.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: correctPasswordHash,
            points: 0,
            createdAt: date
        });

        const result = service.login({
            email: "jvcampos531@gmail.com",
            password: password
        });

        await expect(result)
            .rejects
            .toThrow("Invalid credentials.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });
});