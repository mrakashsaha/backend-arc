import { pool } from "../../db/index.js";

const createProfileIntoDB = async (payload: any) => {

    const { userId, bio, address, phone, gender } = payload;

    const user = await pool.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [userId]);

    if (user.rowCount===0) {
        throw new Error("User not exists in the Database");
    }
    const result = await pool.query(`
    INSERT INTO
    profile (user_id, bio, address, phone, gender)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `, [userId, bio, address, phone, gender])

    return result;
}


export const profileService = { createProfileIntoDB }