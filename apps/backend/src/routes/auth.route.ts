import { userPublic, userInput, userLogin } from "../../../../packages/schemas/userInterfaces";
import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { FastifyInstance } from "fastify";
import { pool } from "../database";
import { z } from "zod";

export async function AuthRoute(app: FastifyInstance){
    const userRepository = new UserRepository(pool);
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