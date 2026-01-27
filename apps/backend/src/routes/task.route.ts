import { createTask, getTasks, deleteTask, updateTask } from "../controllers/task.controller";
import { taskType } from "../../../../packages/schemas/taskInterfaces";
import { typeProvider } from "../index";
import z from "zod";

export async function TaskRoute(app: typeof typeProvider){
    app.get("/tasks",
        {
            schema: z.object({
                response: {
                    200: taskType.array()
               }
            })
        },
        getTasks
    );

    app.post("/tasks",
        {
            schema: z.object({
                response: {
                    201: taskType
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
                    task: taskType
                },
                response: {
                    201: taskType
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
}