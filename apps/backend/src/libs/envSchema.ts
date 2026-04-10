import z from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string(),
    WEB_BASE_URL: z.url(),
    PORT: z.coerce.number(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_TEST_NAME: z.string()
});

export const env = envSchema.parse(process.env);