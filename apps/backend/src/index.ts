import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();

app.register(cors, {
    origin: "http://localhost:3030/"
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({
    port: 3000
});