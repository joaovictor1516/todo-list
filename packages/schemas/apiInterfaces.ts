export interface service<T>{
    data: T | null,
    message?: string,
    error?: string
};

export interface repository<T>{
    getAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    delete(id: string): Promise<void>;
    update(id: string, data: T): Promise<T>;
}