import { TaskDbDto, TaskRepositoryInterface } from "../../../../packages/schemas/taskInterfaces";
import { Pool } from "pg";

export class TaskRepository implements TaskRepositoryInterface{
    constructor(private pool: Pool){}

    async createTask(task: TaskDbDto):Promise<TaskDbDto> {
        const newTask = await this.pool.query("INSERT INTO tasks (task_id, task_title, task_content, task_state, task_created_at, task_event_date, task_priority)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [task.id, task.title, task.content, task.isCompleted, task.createdAt, task.eventDate, task.priority]
        );

        return newTask.rows[0];
    }

    async getTasks():Promise<TaskDbDto[]> {
        const tasks = await this.pool.query("SELECT * FROM tasks");

        return tasks.rows;
    }

    async getTaskById(id: string):Promise<TaskDbDto | null> {
        const task = await this.pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);

        return task.rows[0];
    }

    async updateTask(id: string, task: TaskDbDto):Promise<TaskDbDto> {
        const taskUpdated = await this.pool.query("UPDATE tasks SET task_title = $2, task_content = $3, task_state = $4, task_event_date = $5, task_priority = $6 WHERE task_id = $1 RETURNING *",
            [id, task.title, task.content, task.isCompleted, task.eventDate, task.priority]
        );

        return taskUpdated.rows[0];
    }

    async checkTask(id: string):Promise<TaskDbDto>{
        const taskChecked = await this.pool.query("UPDATE tasks SET task_state = true WHERE task_id = $1 RETURNING *", [id]);

        return taskChecked.rows[0];
    }

    async deleteTask(id: string):Promise<boolean> {
        const task = await this.pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);
        
        return (task.rowCount ?? 0) > 0;
    }
}