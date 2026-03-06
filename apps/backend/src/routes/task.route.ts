import { taskPublic } from "../../../../packages/schemas/taskInterfaces";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repository/task.repository";
import { TaskService } from "../service/task.service";
import { typeProvider } from "../index";
import z from "zod";

export async function TaskRoute(app: typeof typeProvider){
    const taskRepository = new TaskRepository();
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
        taskController.getTasks
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
        taskController.createTask 
    );

    app.put("/:id", 
        {
            schema:{
                params: {
                    id: z.uuid()
                },
                body: taskPublic,
                response: {
                    201: taskPublic
                }
            }
        },
        taskController.updateTask
    );

    app.put("/check/:id", 
        {
            schema: {
                params: {
                    id: z.uuid()
                },
                response: {
                    201: taskPublic
                }
            }
        },
        taskController.checkTask
    );

    app.delete("/:id",
        {
            schema: {
                params: {
                    id: z.uuid()
                },
                response: {
                    201: null
                }
            }
        },
        taskController.deleteTask
    );

    app.head("/", async (_, reply) => {
        reply.code(200).send();
    });
}