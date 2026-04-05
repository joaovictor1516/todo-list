import { describe, jest, test, expect, beforeEach } from "@jest/globals";
import { userRepositoryMock } from "../mock/user/user.repository.mock";
import { UserRepository } from "../../src/repository/user.repository";
import { UserService } from "../../src/service/user.service";

describe("User service tests.", () => {
    let repository: jest.Mocked<UserRepository>;
    let service: UserService;

    beforeEach(() => {
        repository = userRepositoryMock();

        service = new UserService(repository as any);
    });

    test("Get a user using his id:", async () => {
        const date = new Date();

        repository.getUserById.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: "algo",
            points: 0,
            createdAt: date
        });
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
        const date = new Date();
        const dateUser = new Date();
        
        repository.getUserById.mockResolvedValue({
            id: "1",
            name: "Joao Victor",
            email: "jvcampos531@gmail.com",
            passwordHash: "algo",
            points: 0,
            createdAt: dateUser
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
        }, {
            id: "2",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        }]);

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
        }, {
            id: "2",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        }]);
    });

    test("User not founded.", async () => {
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