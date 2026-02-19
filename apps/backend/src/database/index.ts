import { Pool } from "pg";
import { env } from "../libs/envSchema";

export const pool = new Pool({
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME
});

pool.on("connect", () => {
    console.log("Data base connected.");
});