export interface IUser {
    name: string,
    email: string,
    password: string,
    age?: number | null,
    role?: string,
}

export interface IUpdateUser {
    name?: string,
    password?: string,
    role?: string,
    age?: number | null,
    is_Active: boolean
}