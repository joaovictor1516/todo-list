import { createTask, getTasks, deleteTask, updateTask } from "../controllers/task.controller";
import { taskPublic } from "../../../../packages/schemas/taskInterfaces";
import { typeProvider } from "../index";
import z from "zod";

export async function TaskRoute(app: typeof typeProvider){
    app.get("/",
        {
            schema: {
                body: taskPublic,
                response: {
                    200: taskPublic.array()
               }
            }
        },
        getTasks
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
        createTask 
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
        updateTask
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
        deleteTask
    );

    app.head("/", async (_, reply) => {
        reply.code(200).send();
    });
}