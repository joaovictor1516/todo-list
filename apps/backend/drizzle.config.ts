import { defineConfig } from "drizzle-kit";
import { env } from "./src/libs/envSchema";

function buildDatabaseUrl(){
    const user = env.DATABASE_USER;
    const password = env.DATABASE_PASSWORD;
    const host = env.DATABASE_HOST;
    const port = env.DATABASE_PORT;
    const database = env.DATABASE_NAME;

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

export default defineConfig ({
    schema: "./src/database/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials:{
        url: buildDatabaseUrl()
    },
    verbose: true,
    strict: true
});