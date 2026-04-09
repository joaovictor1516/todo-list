import { userDataMock, createUserDataMock, userLoginDataMock } from "../mock/user/user.data.mock";
import { jest, test, expect, describe, beforeEach, afterEach } from "@jest/globals";
import { userRepositoryMock } from "../mock/user/user.repository.mock";
import { UserRepository } from "../../src/repository/user.repository";
import { AuthService } from "../../src/service/auth.service";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs", () => ({
    compare: jest.fn(),
    hash: jest.fn()
}));

describe("Auth service tests:", () => {
    const bcryptCompareMock = bcrypt.compare as jest.MockedFunction<
        (data: string | Buffer, encrypted: string) => Promise<boolean>
    >;
    const bcryptHashMock = bcrypt.hash as jest.MockedFunction<
        (data: string | Buffer, saltOrRounds: string | number) => Promise<string>
    >;

    let repository: jest.Mocked<UserRepository>;
    let service: AuthService;

    beforeEach(() => {
        repository = userRepositoryMock();
        service = new AuthService(repository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Register a new user test:", async () => {
        bcryptHashMock.mockResolvedValue("hash_password");

        repository.createUser.mockResolvedValue(userDataMock({id: "1"}));

        const result = await service.register(createUserDataMock({name: "Joao Victor"}));

        expect(result).toEqual(userDataMock({id: "1"}));

        expect(repository.createUser)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    id: expect.any(String),
                    passwordHash: "hash_password"
                })                
            );
    });

    test("Login a user test:", async () => {
        repository.getUserByEmail.mockResolvedValue(userDataMock({
            id: "2"
            }));

        // bcryptHashMock.mockResolvedValue("hash_password");
        bcryptCompareMock.mockResolvedValue(true);
        
        const result = await service.login(userLoginDataMock({
            email: "jvcampos531@gmail.com"
        }));

        expect(result).toEqual(userDataMock({
            id: "2"
        }));

        expect(bcrypt.compare)
            .toHaveBeenCalled();

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("User already exist test:", async () => {
        repository.getUserByEmail.mockResolvedValue(userDataMock({
            id: "1"
        }));

        const result = service.register(createUserDataMock({
            name: "Joao Victor",
        }));

        await expect(result)
            .rejects
            .toThrow("The user already exist.");

        expect(repository.getUserByEmail)
            .toHaveBeenCalledWith("jvcampos531@gmail.com");
    });

    test("Try to make a login to a user don't exist:", async () => {
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
        bcryptCompareMock.mockResolvedValue(false);

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
        bcryptHashMock.mockResolvedValue("hash_password");
        bcryptCompareMock.mockResolvedValue(true);

        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1"
        }));

        repository.deleteUser.mockResolvedValue(true);

        const result = await service.delete("1", "hash_password");

        expect(result).toEqual(true);

        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");

        expect(repository.deleteUser)
            .toHaveBeenCalledWith("1");
    });

    test("Try to delete a don't exist user:", async () => {
        repository.getUserById.mockResolvedValue(null);

        const result = service.delete("1", "Teste@1234");

        await expect(result)
            .rejects
            .toThrow("User don't exist.");
        
        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");
    });

    test("Try to delete a user using wrong password:", async () => {
        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1"
        }));

        bcryptCompareMock.mockResolvedValue(false);

        const result = service.delete("1", "wrongPassword@20");

        await expect(result)
            .rejects
            .toThrow("Wrong password.");

        expect(repository.getUserById)
            .toHaveBeenCalledWith("1");
    });
});