import { userRepositoryMock } from "../mock/user/user.repository.mock";
import { UserService } from "../../src/service/user.service";
import { describe, test, expect } from "@jest/globals";

describe("User service tests.", () => {
    const repository = userRepositoryMock();
    
    const date = new Date();
    
    repository.getUserById.mockResolvedValue({
        id: "1",
        name: "Joao Victor",
        email: "jvcampos531@gmail.com",
        passwordHash: "algo",
        points: 0,
        createdAt: date
    });

    repository.getUserTasks.mockResolvedValue([{
        id: "1",
        title: "Estudar Node.JS",
        content: "Estudar bibliotecas usadas para subir migrations do banco de dados.",
        createdAt: date,
        lastUpdate: date,
        eventDate: date,
        priority: "high",
        isCompleted: false
    }]);

    const service = new UserService(repository as any);

    test("Get a user using his id:", async () => {
        const result =  await service.getUserInformations("1");

        expect(result).toEqual({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: "algo",
            points: 0,
            createdAt: date
        });
    });

    test("Get user tasks:", async () => {
        const result = await service.getUserTasks("1");

        expect(result).toEqual([{
            id: "1",
            title: "Estudar Node.JS",
            content: "Estudar bibliotecas usadas para subir migrations do banco de dados.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "high",
            isCompleted: false
        }]);
    });

    test("User not founded.", async () => {
        repository.getUserById.mockResolvedValue(null);

        await expect(service.getUserInformations("2"))
            .rejects
            .toThrow("User not founded.");
    });

    test("User tasks not founded.", async () => {

        await expect(service.getUserTasks("3"))
            .rejects
            .toThrow("User not founded.");
    });
});