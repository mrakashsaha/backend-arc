import type { Request } from "express";
import { pool } from "../../db/index.js";
import type { IUpdateUser, IUser } from "./user.interface.js";

const createUserIntoDB = async (payLoad: IUser) => {
    const { name, email, password, age } = payLoad;

    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age]);

    return result;
}

const getAllUsersFromDB = async () => {

    const result = await pool.query(`
            SELECT * FROM users;
            `)
    return result;
}


const getSingleUserFromDB = async (id: string | undefined) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id]);
    return result
}


const updateUserFromDB = async (id: string, payload: IUpdateUser) => {
    const { name, password, age, is_Active } = payload;
    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE ($1, name),
        password = COALESCE ($2, password),
        age = COALESCE ($3, age),
        is_Active = COALESCE ($4, is_Active),
        updatedAt = NOW()
        WHERE id = $5 RETURNING *`,
        [name ?? null, password ?? null, age ?? null, is_Active ?? null, id]);
    return result
}

const deleteUserFromDB = async (id: string) => {
    const result = await  pool.query(`
        
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `, [id])
    return result;
}

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}