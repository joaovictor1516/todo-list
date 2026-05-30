import { describe, test, expect, beforeAll, jest } from "@jest/globals";
import { taskIntegrationDataMock } from "../../mock/task/task.data.mock";
import  request  from "supertest";
import { app } from "../../../src";

describe("Should test the creat's task route:", async () => {
    beforeAll(async () => {
        await app.ready();
    });
 
    test("Create a task:", async () => {
        const response = await request(app.server)
            .post("/users")
            .send({
                id: "1",
                title: "Estudar Programcao",
                content: "Estudar estrutura de dados.",
                createdAt: new Date("2024-01-01T00:00:00.000Z"),
                eventDate: new Date("2024-01-01T00:00:00.000Z"),
                lastUpdate: new Date("2024-01-01T00:00:00.000Z"),
                isCompleted: false,
                priority: "high",
                userId: "1"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            id: "1",
            title: "Estudar Programcao",
            content: "Estudar estrutura de dados.",
            createdAt: new Date("2024-01-01T00:00:00.000Z"),
            eventDate: new Date("2024-01-01T00:00:00.000Z"),
            lastUpdate: new Date("2024-01-01T00:00:00.000Z"),
            isCompleted: false,
            priority: "high",
            userId: "1"
        });      
    });
});