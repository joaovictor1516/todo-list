import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwaggerUI from "@fastify/swagger-ui"
import fastifySwagger from "@fastify/swagger";
import { env } from "./libs/envSchema";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(fastifySwagger, {
    swagger: {
        consumes: ["aplication/json"],
        produces: ["aplication/json"],
        info: {
            title: "DailyTasks",
            description: "API da aplicação de tarefas.",
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

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({
    port: env.PORT
});