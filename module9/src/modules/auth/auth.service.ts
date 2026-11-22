
import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import jwt from "jsonwebtoken"
import config from "../../config/index.js";

const loginUserIntoDB = async (payload: {email: string, password: string}) => {
    // check if the user exists --> done
    // check password is valid or not -->Done
    // check the user status --> done
    // if pass all: generate JWT token-->done

    const {email, password} = payload;
 
    const user = await pool.query(`
    SELECT * FROM users
    where email = $1
    `, [email]);

    if (user.rowCount===0) {
        throw new Error ("Invalid email");
    }

    const matchPassowrd = await bcrypt.compare(password, user.rows[0].password);

    if (!matchPassowrd) {
        throw new Error ("Password not matched");
    }

    if (!user.rows[0].is_active) {
        throw new Error ("User's Account is blocked")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
    }

    const accessToken = jwt.sign(jwtPayload, config.jwtSecret, {expiresIn : "1h"});
    const refreshToken = jwt.sign(jwtPayload, config.refreshSecret, {expiresIn : "10d"});

    delete user.rows[0].password;

    return {accessToken, refreshToken, user: user.rows[0]};
}

export const authService = {loginUserIntoDB}