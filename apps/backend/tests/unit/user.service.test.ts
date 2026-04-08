import { describe, jest, test, expect, beforeEach } from "@jest/globals";
import { userRepositoryMock } from "../mock/user/user.repository.mock";
import { UserRepository } from "../../src/repository/user.repository";
import { UserService } from "../../src/service/user.service";
import { taskDataMock } from "../mock/task/task.data.mock";
import { userDataMock } from "../mock/user/user.data.mock";

describe("User service tests.", () => {
    let repository: jest.Mocked<UserRepository>;
    let service: UserService;

    beforeEach(() => {
        repository = userRepositoryMock();
        service = new UserService(repository);
    });

    test("Get a user using his id:", async () => {
        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1"
        }));
        const result =  await service.getUserInformations("1");

        expect(result).toEqual(userDataMock({
            id: "1"
        }));
    });

    test("Get user tasks:", async () => {
        repository.getUserById.mockResolvedValue(userDataMock({
            id: "1"
        }));

        repository.getUserTasks.mockResolvedValue([taskDataMock({id: "1"}), taskDataMock({id: "2", 
            title: "Malhar", 
            content: "Ir  pra academia"})]);

        const result = await service.getUserTasks("1");

        expect(result).toEqual([taskDataMock({ id: "1" }), taskDataMock({
            id: "2",
            title: "Malhar",
            content: "Ir  pra academia"
        })]);
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