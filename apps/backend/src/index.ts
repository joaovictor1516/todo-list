import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { errorHandler } from "./libs/errorHandler";
import fastifySwagger from "@fastify/swagger";
import { env } from "./libs/envSchema";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

export const typeProvider = app.withTypeProvider<ZodTypeProvider>();

app.register(fastifySwagger, {
    swagger: {
        consumes: ["aplication/json"],
        produces: ["aplication/json"],
        info: {
            title: "DailyTasks",
            description: "API do DailyTasks.",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUI, {
    routePrefix: "/docs"
});

app.register(cors, {
    origin: env.WEB_BASE_URL
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});

app.setErrorHandler(errorHandler);
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({
    port: env.PORT
});