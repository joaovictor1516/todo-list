import { MigrationBuilder } from "node-pg-migrate";

export const upUserTestTable = (pgm: MigrationBuilder) => {
    pgm.createTable("users", {
        user_id: {type: "uuid", primaryKey: true},
        user_password: {type: "text", notNull: true},
        user_email: {type: "varchar(254)", notNull: true, unique: true},
        user_name: {type: "varchar(50)", notNull: true, unique: true},
        user_points: {type: "int", notNull: true, default: 0}
    });
};

export const downUserTestTable = (pgm: MigrationBuilder) => {
    pgm.dropTable("users");
};