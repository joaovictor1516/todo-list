import type { TaskInterface } from "./taskInterfaces";
import type { UserInterface } from "./userInterfaces";

export interface service<T>{
    data: T | null,
    message?: string,
    error?: string
};

export interface baseRepository<T>{
    create(data: T): Promise<T>;
    delete(id: string): Promise<void>;
    update(id: string, data: T): Promise<T>;
}

export interface taskRepository extends baseRepository<TaskInterface> {
    getAll(): Promise<TaskInterface[]>;   
}

export interface userRepository{
    getMe(): Promise<UserInterface>;
    update(data: Partial<UserInterface>): Promise<UserInterface>;
    updatePassword(currentPassword: string, newPassword: string): Promise<string>;
}