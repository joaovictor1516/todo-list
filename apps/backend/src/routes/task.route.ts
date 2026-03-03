import { createTask, getTasks, deleteTask, updateTask } from "../controllers/task.controller";
import { taskPublic } from "../../../../packages/schemas/taskInterfaces";
import { typeProvider } from "../index";
import z from "zod";

export async function TaskRoute(app: typeof typeProvider){
    app.get("/tasks",
        {
            schema: z.object({
                response: {
                    200: taskPublic.array()
               }
            })
        },
        getTasks
    );

    app.post("/tasks",
        {
            schema: z.object({
                response: {
                    201: taskPublic
                }
            })
        },
        createTask 
    );

    app.put("/tasks/:id", 
        {
            schema: z.object({
                params: {
                    id: z.uuid()
                },
                body: {
                    task: taskPublic
                },
                response: {
                    201: taskPublic
                }
            })
        },
        updateTask
    );

    app.delete("/tasks/:id",
        {
            schema: z.object({
                params: {
                    id: z.uuid()
                },
                response: {
                    201: null
                }
            })
        },
        deleteTask
    );

    app.head("/tasks", async (_, reply) => {
        reply.code(200).send();
    });
}