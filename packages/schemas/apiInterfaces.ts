export interface service<T>{
    data: T | null,
    message?: string,
    error?: string
};

export interface repository<T>{
    getAll(): Promise<T[]>;
    create(data: T): Promise<void>;
    delete(id: string): Promise<void>;
    update(id: string, data: T): Promise<void>;
}