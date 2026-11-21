import type { NextFunction, Request, Response } from "express";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken"
import config from "../config/index.js";
import { pool } from "../db/index.js";
import type { Role } from "../types/index.js";

const auth = (...roles: Role[]) => {

    console.log(roles);

    return async (req: Request, res: Response, next: NextFunction) => {
        // For Protected Route:
        // 1- Check the token exists
        // 2- Verfify token
        // 3- User exists or not
        // 4- Check user status

        try {

            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ success: false, message: "Unauthorized access" });
            }

            const decode = jwt.verify(token, config.jwtSecret) as JwtPayload;

            const user = await pool.query(`
            SELECT * FROM users where email = $1 
            `, [decode.email])

            if (user.rowCount === 0) {
                return res.status(404).json({ success: false, message: "User Not Found" })

            }

            if (!user.rows[0].is_active) {
                return res.status(403).json({ success: false, message: "User is blocked" })

            }


            if (roles.length && !roles.includes(user.rows[0].role)) {
                return res.status(401).json({ success: false, message: "Unauthorized access" });
            }

            req.user = decode;
            next();


        }

        catch (error: any) {
            next(error);

        }


    }
}

export default auth;