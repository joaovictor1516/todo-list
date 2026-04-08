import { userDataMock, createUserDataMock, userLoginDataMock } from "../mock/user/user.data.mock";
import { jest, test, expect, describe, beforeEach, beforeAll } from "@jest/globals";
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
        repository.createUser.mockResolvedValue(userDataMock({id: "1"}));

        const result = await service.register(createUserDataMock({name: "Joao Victor"}));

        expect(result).toEqual(userDataMock({id: "1"}));

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
        const passwordHash = await bcrypt.hash("password", 10)
        repository.getUserByEmail.mockResolvedValue(userDataMock({
            id: "2",
            passwordHash: passwordHash
            }));

        const result = await service.login(userLoginDataMock({
            email: "jvcampos531@gmail.com"
        }));

        expect(result).toEqual(userDataMock({
            id: "2",
            passwordHash: passwordHash
        }));

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("User alwere exist test:", async () => {
        repository.getUserByEmail.mockResolvedValue(userDataMock({
            id: "1"
        }));

        const result = service.register(createUserDataMock({
            name: "Joao Victor",
        }));

        await expect(result)
            .rejects
            .toThrow("The user alwere exist.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Try to make a login to a user dont exist:", async () => {
        repository.getUserByEmail.mockResolvedValue(null);

        const result = service.login(userLoginDataMock({
            email: "jvcampos531@gmail.com"
        }));

        await expect(result)
            .rejects
            .toThrow("Invalid credentials.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Try to make login with wrong password:", async () => {
        repository.getUserByEmail.mockResolvedValue(userDataMock({
            passwordHash: "correct_password_hash"
        }));

        const result = service.login(userLoginDataMock({
            email: "jvcampos531@gmail.com"
        }));

        await expect(result)
            .rejects
            .toThrow("Invalid credentials.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Delete user test:", async () => {
        const passwordHash = await bcrypt.hash("hash_password", 10);

        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1",
            passwordHash: passwordHash
        }));

        repository.deleteUser.mockResolvedValue(true);

        const result = await service.delete("1", "hash_password");

        expect(result).toEqual(true);

        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");

        expect(repository.deleteUser)
            .toHaveBeenCalledWith("1");
    });

    test("Try to delete a dont exist user:", async () => {
        repository.getUserById.mockResolvedValue(null);

        const result = service.delete("1", "Teste@1234");

        await expect(result)
            .rejects
            .toThrow("User dont exist.");
        
        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");
    });

    test("Try to delete a user using wrong password:", async () => {
        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1"
        }));

        const result = service.delete("1", "wrongPassword@20");

        await expect(result)
            .rejects
            .toThrow("Wrong password.");

        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");
    });
});