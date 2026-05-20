import { env } from "./envSchema";

export function buildDatabaseUrl() {
    const user = env.DATABASE_USER;
    const password = env.DATABASE_PASSWORD;
    const host = env.DATABASE_HOST;
    const port = env.DATABASE_PORT;
    const database = env.DATABASE_NAME;

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}