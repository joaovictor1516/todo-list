import { buildDatabaseUrl } from "../libs/buildDatabaseUrl";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: buildDatabaseUrl()
});

export const dataBase = drizzle(pool);

pool.on("connect", () => {
    console.log("Data base connected.");
});