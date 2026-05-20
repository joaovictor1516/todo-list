import { buildDatabaseUrl } from "./src/libs/buildDatabaseUrl";
import { defineConfig } from "drizzle-kit";

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