import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { strict } from "assert";
import sendResponse from "../../utils/sendResponse.js";

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

        sendResponse(res,{ statusCode: 200, success: true, data: result, message: "Access token created successfully",})

    }
    catch (error: any) {
        sendResponse (res, {statusCode: 500, message: error.message, success: false, error: error})
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