import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { strict } from "assert";

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);

        const { refreshToken } = result;

        res.cookie("refreshToken", refreshToken, {
            secure: false, //http--> false, https->true
            httpOnly: true, //prevent xss attach
            sameSite: "lax", //none, strict, lax  ->CSRFattach prevent
            // maxAge
            path: "/",
            domain: "localhost" //example.ocm for acctual site

        })

        res.status(200).json({ success: true, message: "Access token created successfully", data: result });



    }
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error })
    }
}
const generateToken = async (req: Request, res: Response) => {
    try {
        const result = await authService.generateAccessToken(req.cookies.refreshToken);


        res.status(200).json({ success: true, message: "Access token reGenerateds successfully", data: result });



    }
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error })
    }
}

export const authController = { loginUser, generateToken };