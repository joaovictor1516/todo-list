import { UserInterface } from "../../../../packages/schemas/userInterfaces";
import { pool } from "../database";

export class USerRepository{
    async createUser(user: UserInterface):Promise<UserInterface>{
        const newUser = await pool.query("INSERT INTO users (user_id, user_email, user_name, user_points) VALUES ($1, $2, $3, $4) RETURNING *", [user.id, user.email, user.name, user.points]);

        return newUser.rows[0];
    }

    async getUsers():Promise<UserInterface[]>{
        const users = await pool.query("SELECT * FROM users");

        return users.rows;
    }

    async getUserById(id: string):Promise<UserInterface>{
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

        return user.rows[0];
    }

    async updateUser(id: string, user: UserInterface):Promise<UserInterface>{
        const userUpdated = await pool.query("UPDATE users SET user_email = $2, user_name = $3, user_points = $4 WHERE user_id = $1 RETURNING *", [id, user.email, user.name, user.points]);

        return userUpdated.rows[0];
    }

    async deleteUser(id: string):Promise<boolean>{
        const user = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);

        return (user.rowCount ?? 0) > 0;
    }
}