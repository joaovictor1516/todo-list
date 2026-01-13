import z from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string(),
    API_BASE_URL: z.url(),
    WEB_BASE_URL: z.url(),
    DATA_BASE: z.url(),
    PORT: z.number()
});

export const env = envSchema.parse(process.env);