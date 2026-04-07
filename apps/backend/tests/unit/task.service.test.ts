import { describe, jest, test, expect, beforeEach } from "@jest/globals";
import { taskRepositoryMock } from "../mock/task/task.repository.mock";
import { TaskRepository } from "../../src/repository/task.repository";
import { TaskService } from "../../src/service/task.service";

describe("Task service tests:", () => {
    let repository: jest.Mocked<TaskRepository>;
    let service: TaskService;

    beforeEach(() => {
        repository = taskRepositoryMock();
        service = new TaskService(repository);
    });

    test("Create new task test:", async () => {
        const date = new Date();

        repository.createTask.mockResolvedValue({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });
        
        const result = await service.createTask({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        expect(result).toEqual({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        expect(repository.createTask)
            .toHaveBeenCalledWith({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });
    });

    test("Get all tasks test:", async () => {
        const dateStudyTask = new Date();
        const date = new Date();

        repository.getTasks.mockResolvedValue([{
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        }, {
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: dateStudyTask,
            lastUpdate: dateStudyTask,
            eventDate: dateStudyTask,
            priority: "medium",
            isCompleted: false
        }]);

        const result = await service.getTasks();

        expect(result).toEqual([{
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        }, {
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: dateStudyTask,
            lastUpdate: dateStudyTask,
            eventDate: dateStudyTask,
            priority: "medium",
            isCompleted: false
        }]);

        expect(repository.getTasks)
            .toHaveBeenCalled();
    });

    test("Get a task using id:", async () => { 
        const dateStudyTask = new Date();

        repository.getTaskById.mockResolvedValue({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: dateStudyTask,
            lastUpdate: dateStudyTask,
            eventDate: dateStudyTask,
            priority: "medium",
            isCompleted: false
        });

        const result = await service.getTaskById("2");

        expect(result).toEqual({
            id: "2",
            title: "Estudar React.JS",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: dateStudyTask,
            lastUpdate: dateStudyTask,
            eventDate: dateStudyTask,
            priority: "medium",
            isCompleted: false
        });

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
        const date = new Date();

        repository.getTaskById.mockResolvedValue({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        repository.checkTask.mockResolvedValue({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: true
        });

        const result = await service.completTask("1");

        expect(result).toEqual({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: true
        });

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");
        
        expect(repository.checkTask)
            .toHaveBeenCalledWith("1");
    });

    test("Try to check a task checked:", async () => {
        const date = new Date();

        repository.getTaskById.mockResolvedValue({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: true
        });

        await expect(service.completTask("1"))
            .rejects
            .toThrow("Task is alwere completed.");

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");
    });

    test("Update a task test:", async () => {
        const date = new Date();
        const newDate = new Date();

        repository.getTaskById.mockResolvedValue({
            id: "1",
            title: "Ir para a academia",
            content: "Criar vergonha na cara e melhorar a saude.",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        repository.updateTask.mockResolvedValue({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            createdAt: date,
            lastUpdate: newDate,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        const result = await service.updateTask("1", {
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        expect(result).toEqual({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            createdAt: date,
            lastUpdate: newDate,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

        expect(repository.getTaskById)
            .toHaveBeenCalledWith("1");

        expect(repository.updateTask)
            .toHaveBeenCalledWith("1", {
                id: "1",
                title: "Estudar React",
                content: "Praticar mais o desenvolvimento do front de um projeto!!",
                createdAt: date,
                lastUpdate: newDate,
                eventDate: date,
                priority: "medium",
                isCompleted: false
            });
    });

    test("Delete a task test:", async () => {
        const date = new Date();

        repository.getTaskById.mockResolvedValue({
            id: "1",
            title: "Estudar React",
            content: "Praticar mais o desenvolvimento do front de um projeto!!",
            createdAt: date,
            lastUpdate: date,
            eventDate: date,
            priority: "medium",
            isCompleted: false
        });

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