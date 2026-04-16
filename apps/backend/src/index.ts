import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { errorHandler } from "./libs/errorHandler";
import { TaskRoute } from "./routes/task.route";
import { AuthRoute } from "./routes/auth.route";
import { UserRoute } from "./routes/user.route";
import fastifySwagger from "@fastify/swagger";
import { env } from "./libs/envSchema";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import fastify from "fastify";

export const app = fastify({logger: true}).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "DailyTasks",
            description: "API do DailyTasks.",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`
            }
        ]
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUI, {
    routePrefix: "/docs"
});

app.register(cors, {
    // origin: env.WEB_BASE_URL
    origin: true
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});

app.register(TaskRoute, { prefix: "/tasks" });
app.register(UserRoute, { prefix: "/users" });
app.register(AuthRoute, { prefix: "/auth" });

app.setErrorHandler(errorHandler);

app.listen({
    port: env.PORT
}).then(() => {
    console.log("Server running.");
}).catch((error) => {
    app.log.error(error);
    process.exit(1);
});