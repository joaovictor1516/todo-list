import { taskPublic } from "../../../../packages/schemas/taskInterfaces";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repository/task.repository";
import { TaskService } from "../service/task.service";
import { FastifyInstance } from "fastify";
import { pool } from "../database";
import { z } from "zod";

export async function TaskRoute(app: FastifyInstance){
    const taskRepository = new TaskRepository(pool);
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);
    app.get("/",
        {
            schema: {
                response: {
                    200: taskPublic.array()
                }
            }
        },
        taskController.getTasks.bind(taskController)
    );

    app.post("/",
        {
            schema: {
                body: taskPublic,
                response: {
                    201: taskPublic
                }
            }
        },
        taskController.createTask.bind(taskController)
    );

    app.put("/:id",
        {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                body: taskPublic,
                response: {
                    200: taskPublic
                }
            }
        },
        taskController.updateTask.bind(taskController)
    );

    app.put("/check/:id",
        {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                response: {
                    200: taskPublic
                }
            }
        },
        taskController.checkTask.bind(taskController)
    );

    app.delete("/:id",
        {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                response: {
                    200: z.object({
                        message: z.string()
                    })
                }
            }
        },
        taskController.deleteTask.bind(taskController)
    );
}