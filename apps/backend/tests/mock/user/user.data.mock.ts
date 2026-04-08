import { UserDbDto, UserLoginDto, UserInputDto } from "../../../../../packages/schemas/userInterfaces";

export const userDataMock = (overrides: Partial<UserDbDto> = {}): UserDbDto => ({
    id: "i",
    name: "João Victor",
    email: "jvcampos531@gmail.com",
    passwordHash: "hash_password",
    points: 0,
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    ...overrides,
});

export const createUserDataMock = (overrides: Partial<UserInputDto> = {}): UserInputDto => ({
    name: "João Victor",
    email: "jvcampos531@gmail.com",
    password: "password",
    ...overrides
});

export const userLoginDataMock = (overrides: Partial<UserLoginDto> = {}): UserLoginDto => ({
    email: "jvcampos531@gmail.com",
    password: "password",
    ...overrides
});