import { MigrationBuilder } from "node-pg-migrate";

export const upTaskTestTable = (pgm: MigrationBuilder) => {
    pgm.createTable("tasks", {
        task_id: {type: "uuid", primaryKey: true},
        task_title: {type: "varchar(25)", notNull: true},
        task_content: {type: "varchar(100)", notNull: true},
        task_state: {type: "boolean", notNull: true, default: false},
        task_created_at: {type: "timestamp", notNull: true, default: "current_timestamp"},
        task_event_date: {type: "timestamp"},
        task_priority: {type: "varchar(6)", notNull: true},
        user_id: {type: "uuid"},
    });
};

export const downTaskTestTable = (pgm: MigrationBuilder) => {
    pgm.dropTable("tasks");
};