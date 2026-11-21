import type { NextFunction, Request, Response } from "express";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken"
import config from "../config/index.js";
import { pool } from "../db/index.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    // For Protected Route:
    // 1- Check the token exists
    // 2- Verfify token
    // 3- User exists or not
    // 4- Check user status

    try {

        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized access" });
            return
        }

        const decode = jwt.verify(token, config.jwtSecret) as JwtPayload;

        const user = await pool.query(`
            SELECT * FROM users where email = $1 
            `, [decode.email])

        if (user.rowCount === 0) {
            res.status(404).json({ success: false, message: "User Not Found" })
            return;
        }

        if (!user.rows[0].is_active) {
            res.status(403).json({ success: false, message: "User is blocked" })
            return;
        }

        req.user = decode;
        next();

    } 
    
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error })
    }


}

export default auth;