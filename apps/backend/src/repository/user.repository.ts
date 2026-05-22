import { UserDbDto, UserInputDto, UserRepositoryInterface } from "../../../../packages/schemas/userInterfaces";
import { TaskDbDto } from "../../../../packages/schemas/taskInterfaces";
import { userTable, taskTable } from "../database/migrations/001.createTables";
import { dataBase } from "../database";
import { eq } from "drizzle-orm";

export class UserRepository implements UserRepositoryInterface{
    async createUser(user: UserDbDto):Promise<UserDbDto>{
        const [newUser] = await dataBase
            .insert(userTable)
            .values({
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                points: user.points,
                createdAt: user.createdAt
            })
            .returning();

        return newUser;
    };

    async getUsers():Promise<UserDbDto[]>{
        return await dataBase.select().from(userTable);
    };

    async getUserById(id: string):Promise<UserDbDto>{
        const [user] = await dataBase
            .select()
            .from(userTable)
            .where(eq(userTable.id, id));

        return user;
    };

    async getUserByEmail(email: string):Promise<UserDbDto>{
        const [user] = await dataBase
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

        return user;
    };

    async getUserTasks(id: string):Promise<TaskDbDto[]>{
        const tasks = await dataBase
            .select()
            .from(taskTable)
            .where(eq(taskTable.userId, id));

        return tasks;
    };

    async updateUser(id: string, user: UserInputDto):Promise<UserDbDto>{
        const [userUpdated] = await dataBase
            .update(userTable)
            .set({
                name: user.name,
                email: user.email
            })
            .returning();

        return userUpdated;
    };

    async updatePoint(id: string, userNewPoint: number):Promise<UserDbDto>{
        const [userUpdated] = await dataBase
            .update(userTable)
            .set({
                points: userNewPoint
            })
            .returning();

        return userUpdated;
    };

    async deleteUser(id: string):Promise<boolean>{
        const result = await dataBase
            .delete(userTable)
            .where(eq(userTable.id, id))
            .returning();

        return result.length === 0;
    };
}