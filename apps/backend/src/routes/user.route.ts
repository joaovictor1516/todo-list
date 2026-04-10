import { userInput, userPublic } from "../../../../packages/schemas/userInterfaces";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { typeProvider } from "../index";
import { pool } from "../database";
import { z } from "zod";

export async function UserRoute(app: typeof typeProvider){
    const userRepository = new UserRepository(pool);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.get("/me", {
        schema: {
            response: {
                200: userPublic
                }
            }
        }, 
    userController.getUserInformations.bind(userController)
    );
    
    app.get("/me/tasks", {
        schema: {
            response: {
                200: userPublic
                }
            }
        },
        userController.getUserTasks.bind(userController)
    );

    app.put("/me", {
        schema: {
            params: {
                id: z.uuid()
                },
            body: userInput,
            response: {
                200: userPublic
                }
            }
        }, 
        userController.updateUser.bind(userController)
    );

    app.put("/me/points", {
        schema: {
            params: {
                id: z.uuid()
                },
            body: z.number(),
            response: {
                200: userPublic
                }
            }
        },
        userController.updateUserPoint.bind(userController)
    );
}