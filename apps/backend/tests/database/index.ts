import { env } from "../../src/libs/envSchema";
import { Pool } from "pg";

export const testPool = new Pool({
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_TEST_NAME
});

const connectionStringTestDatabase = `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_TEST_NAME}`;

testPool.on("connect", () => {
    console.log("Test data base connected.");
})