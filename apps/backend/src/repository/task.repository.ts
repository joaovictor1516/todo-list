import { TaskInterface } from "../../../../packages/schemas/taskInterfaces";
import { pool } from "../database";

//Lembrar que todas as checagens de igualdade entre ID's sera feita no service!!!
export class TaskRepository {
    async createTask(task: TaskInterface): Promise<TaskInterface> {
        const newTask = await pool.query("INSERT INTO tasks (task_id, task_title, task_content, task_state, task_created_at, task_event_date, task_priority, task_tags)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [task.id, task.title, task.content, task.isCompleted, task.createdAt, task.eventDate, task.priority, task.tags]
        );

        return newTask.rows[0];
    }

    async getTasks(): Promise<TaskInterface[]> {
        const tasks = await pool.query("SELECT * FROM tasks");

        return tasks.rows;
    }

    async getTaskById(id: string): Promise<TaskInterface | undefined> {
        const task = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);

        return task.rows[0];
    }

    async updateTask(id: string, task: TaskInterface): Promise<TaskInterface> {
        const taskUpdated = await pool.query("UPDATE tasks SET task_title = $2, task_content = $3, task_state = $4, task_event_date = $5, task_priority = $6, task_tags = $7 WHERE task_id = $1 RETURNING *",
            [id, task.title, task.content, task.isCompleted, task.eventDate, task.priority, task.tags]
        );

        return taskUpdated.rows[0];
    }

    async deleteTask(id: string): Promise<boolean> {
        const task = await pool.query("DELETE FROM tasks WHERE task_id=$1", [id]);
        
        return (task.rowCount ?? 0) > 1;
    }
}