import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { typeProvider } from "../index";

export async function UserRoute(app: typeof typeProvider){
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.get("/me", {
        schema: {
            response: {
                200: userController
                }
            }
        }, 
    userController.getUserInformations
    );
    
    app.get("/me/tasks", {
        schema: {
            response: {
                200: UserController
                }
            }
        },
        userController.getUserTasks
    );
}