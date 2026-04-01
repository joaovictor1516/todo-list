import { userPublic, userInput, userLogin } from "../../../../packages/schemas/userInterfaces";
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { typeProvider } from "../index";


export async function AuthRoute(app: typeof typeProvider){
    const userRepository = new UserRepository();
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    app.post("/register",
        {
            schema:{
                body: userInput,
                response: {
                    201: userPublic
                }
            }
        },
        authController.authCreateUser.bind(authController)
    );

    app.post("/login", 
        {
            schema: {
                body: userLogin,
                response: {
                    200: userPublic
                }
            }
        },
        authController.authLoginUser.bind(authController)
    );
}