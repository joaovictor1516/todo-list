import { userPublic } from "../../../../packages/schemas/userInterfaces";
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { typeProvider } from "../index";
import { z } from "zod";


export async function authRoute(app: typeof typeProvider){
    const userRepository = new UserRepository();
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    app.post("/auth",
        {
            schema: z.object({
                response: {
                    201: userPublic
                }
            })
        },
        authController.authCreateUser
    );

    app.get("", 
        {
            schema: z.object({
                response: {
                    200: userPublic
                }
            })
        },
        authController.authLoginUser
    );
}