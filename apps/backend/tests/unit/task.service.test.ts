import { taskRepositoryMock } from "../mock/task/task.repository.mock";
import { TaskService } from "../../src/service/task.service";
import { describe, test, expect } from "@jest/globals";

describe("Task service tests:", () => {
    const repository = taskRepositoryMock();

    const date = new Date();
    const dateStudyTask = new Date()
    const dateUpdate = new Date();

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

    const service = new TaskService(repository as any);

    test("Create new task test:", async () => {
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
    });

    test("Get all tasks test:", async () => {
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
    });

    test("Get a task using id:", async () => {
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
    });
});