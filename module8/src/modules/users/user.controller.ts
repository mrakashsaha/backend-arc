import type { Request, Response } from "express";
import { pool } from "../../db/index.js";

const createUser = async (req: Request, res: Response) => {

    try {
        const { name, email, password, age } = req.body;

        const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age])


        res.status(200).json({ success: true, message: "User Created Sucessfully", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });

    }

}

export const  userContoller = {createUser};