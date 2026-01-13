import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./libs/envSchema";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors, {
    origin: env.WEB_BASE_URL
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({
    port: env.PORT
});