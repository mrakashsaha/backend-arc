import { pool } from "../../config/db.js";
import { passwordHelper } from "../../utils/passwordHelper.js";
import type { IUser } from "./auth.interface.js";


const registerUserInfoToDB = async (payload: IUser) => {

    const  {name, email, password, role} = payload;

    const hashPassword = await passwordHelper.hashPassword(password);
    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4) RETURNING *
        `

    return await pool.query(query, [name, email, hashPassword, role]);

}



export const authServices = {
    registerUserInfoToDB
}