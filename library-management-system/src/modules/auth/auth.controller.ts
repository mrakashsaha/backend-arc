import type { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service.js";

const register = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = await authServices.registerUserInfoToDB(req.body);

        res.send({ message: "User register sucessfully", data: result.rows[0] });



    } catch (error: unknown) {
        res.send({ message: error instanceof Error ? error.message : "Somthing went wrong while registering new user" });

    }
}


export const authController = {
    register,
}