import { describe, jest, test, expect, beforeEach } from "@jest/globals";
import { taskRepositoryMock } from "../mock/task/task.repository.mock";
import { TaskService } from "../../src/service/task.service";
import { taskDataMock } from "../mock/task/task.data.mock";
import { TaskRepositoryInterface } from "../../../../packages/schemas/taskInterfaces";

describe("Task service tests:", () => {
    let repository: jest.Mocked<TaskRepositoryInterface>;
    let service: TaskService;

    beforeEach(() => {
        repository = taskRepositoryMock();
        service = new TaskService(repository);
    });

    test("Create new task test:", async () => {
        repository.createTask.mockResolvedValue(taskDataMock({id: "1"}));
        
        const result = await service.createTask(taskDataMock({id: "1"}));

        expect(result).toEqual(taskDataMock({id: "1"}));

        expect(repository.createTask)
            .toHaveBeenCalledWith(taskDataMock({id: "1"}));
    });

    test("Get all tasks test:", async () => {
        repository.getTasks.mockResolvedValue([taskDataMock({id: "1"}), taskDataMock({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            priority: "medium"
        })]);

        const result = await service.getTasks();

        expect(result).toEqual([taskDataMock({ id: "1" }), taskDataMock({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            priority: "medium"
        })]);

        expect(repository.getTasks)
            .toHaveBeenCalled();
    });

    test("Get a task using id:", async () => {
        repository.getTaskById.mockResolvedValue(taskDataMock({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude."
        }));

        const result = await service.getTaskById("2");

        expect(result).toEqual(taskDataMock({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude."
        }));

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("2");
    });

    test("Try to get a not exist task:", async () => {
        await expect(service.getTaskById("3"))
            .rejects
            .toThrow("Task dont exist.");

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("3");   
    });

    test("Complete a task test:", async () => {
        repository.getTaskById.mockResolvedValue(taskDataMock({
            id: "1",
            priority: "medium",
        }));

        repository.checkTask.mockResolvedValue(taskDataMock({
            id: "1",
            priority: "medium",
            isCompleted: true
        }));

        const result = await service.completTask("1");

        expect(result).toEqual(taskDataMock({
            id: "1",
            priority: "medium",
            isCompleted: true
        }));

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");
        
        expect(repository.checkTask)
            .toHaveBeenCalledWith("1");
    });

    test("Try to check a task checked:", async () => {
        repository.getTaskById.mockResolvedValue(taskDataMock({
            id: "1",
            isCompleted: true
        }));

        await expect(service.completTask("1"))
            .rejects
            .toThrow("Task is alwere completed.");

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");
    });

    test("Update a task test:", async () => {
        repository.getTaskById.mockResolvedValue(taskDataMock({
            id: "1",
            priority: "medium"
        }));

        repository.updateTask.mockResolvedValue(taskDataMock({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            lastUpdate: new Date("2024-02-01T00:00:00.000Z"),
        }));

        const result = await service.updateTask("1", taskDataMock({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            lastUpdate: new Date("2024-02-01T00:00:00.000Z")
        }));

        expect(result).toEqual(taskDataMock({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            lastUpdate: new Date("2024-02-01T00:00:00.000Z")
        }));

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");

        expect(repository.updateTask)
            .toHaveBeenCalledWith("1", taskDataMock({
                id: "1",
                title: "Estudar React",
                content: "Praticar mais o desenvolvimento do front de um projeto!!",
                lastUpdate: new Date("2024-02-01T00:00:00.000Z")
            }));
    });

    test("Delete a task test:", async () => {
        repository.getTaskById.mockResolvedValue(taskDataMock({
            id: "1"
        }));

        repository.deleteTask.mockResolvedValue(true);

        const result = await service.deleteTask("1");

        expect(result).toEqual(true);

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");

        expect(repository.deleteTask)
            .toHaveBeenCalledWith("1");
    });

    test("try to delete a not existent task:", async () => {
        repository.getTaskById.mockResolvedValue(null);

        const result = service.deleteTask("1");

        await expect(result)
            .rejects
            .toThrow("Task dont exist.");

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");
    });
});