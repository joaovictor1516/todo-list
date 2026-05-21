import { TaskDbDto, TaskRepositoryInterface } from "../../../../packages/schemas/taskInterfaces";
import { taskTable } from "../database/migrations/001.createTables";
import { dataBase } from "../database";
import { eq } from "drizzle-orm";

export class TaskRepository implements TaskRepositoryInterface{
    async createTask(task: TaskDbDto):Promise<TaskDbDto>{
        const [newTask] = await dataBase
            .insert(taskTable)
            .values({
                id: task.id,
                title: task.title,
                content: task.content,
                isCompleted: task.isCompleted,
                createdAt: task.createdAt,
                lastUpdate: task.lastUpdate,
                eventDate: task.eventDate,
                priority: task.priority,
                userId: task.userId
            })
            .returning();

        return newTask;
    };

    async getTasks():Promise<TaskDbDto[]>{
        return await dataBase.select().from(taskTable);
    };

    async getTaskById(id: string):Promise<TaskDbDto | null>{
        const [task] = await dataBase
            .select()
            .from(taskTable)
            .where(eq(taskTable.id, id));
        
        return task;
    };

    async updateTask(id: string, task: TaskDbDto):Promise<TaskDbDto>{
        const [taskUpdated] = await dataBase
            .update(taskTable)
            .set({
                title: task.title,
                content: task.content,
                isCompleted: task.isCompleted,
                createdAt: task.createdAt,
                lastUpdate: task.lastUpdate,
                eventDate: task.eventDate,
                priority: task.priority,
                userId: task.userId
            })
            .where(eq(taskTable.id, id))
            .returning();

        return taskUpdated;
    };

    async checkTask(id: string):Promise<TaskDbDto>{
        const [task] = await dataBase
            .update(taskTable)
            .set({
                isCompleted: true
            })
            .where(eq(taskTable.id, id))
            .returning();
        
        return task;
    };

    async deleteTask(id: string):Promise<boolean>{
        const result = await dataBase
            .delete(taskTable)
            .where(eq(taskTable.id, id))
            .returning();

        return result.length === 0;
    };
}