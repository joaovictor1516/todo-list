import { UserDbDto, UserInputDto } from "../../../../packages/schemas/userInterfaces";
import { TaskDbDto } from "../../../../packages/schemas/taskInterfaces";
import { Pool } from "pg";

export class UserRepository{
    constructor(private pool: Pool){}

    async createUser(user: UserDbDto):Promise<UserDbDto>{
        const newUser = await this.pool.query("INSERT INTO users (user_id, user_email, user_name, user_points) VALUES ($1, $2, $3, $4) RETURNING *", [user.id, user.email, user.name, user.points]);

        return newUser.rows[0];
    }

    async getUsers():Promise<UserDbDto[]>{
        const users = await this.pool.query("SELECT * FROM users");

        return users.rows;
    }

    async getUserById(id: string):Promise<UserDbDto | null>{
        const user = await this.pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

        return user.rows[0];
    }

    async getUserByEmail(email: string): Promise<UserDbDto | null>{
        const user = await this.pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        return user.rows[0];
    }

    async getUserTasks(id: string): Promise<TaskDbDto[]>{
        const userTasks = await this.pool.query("SELECT * FROM tasks WHERE user_id = $1", [id]);
        
        return userTasks.rows;
    }

    async updateUser(id: string, user: UserInputDto):Promise<UserDbDto>{
        const userUpdated = await this.pool.query("UPDATE users SET user_email = $2, user_name = $3 WHERE user_id = $1 RETURNING *", [id, user.email, user.name]);

        return userUpdated.rows[0];
    }

    async updatePoint(id: string, userNewPoint: number):Promise<UserDbDto>{
        const userUpdatedPoint = await this.pool.query("UPDATE users set user_points = $2 WHERE user_id = $1 RETURNING *", [id, userNewPoint]);

        return userUpdatedPoint.rows[0];
    }

    async deleteUser(id: string):Promise<boolean>{
        const user = await this.pool.query("DELETE FROM users WHERE user_id = $1", [id]);

        return (user.rowCount ?? 0) > 0;
    }
}