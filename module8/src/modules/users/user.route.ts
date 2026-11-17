import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userContoller } from "./user.controller.js";

const router = Router();

// EndPoints: /api/v1/users/ ==> Post a User
router.post("/", userContoller.createUser);

// EndPoints: /api/v1/users/ ==> Get all users
router.get("/", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`
            SELECT * FROM users;
            `)

        res.status(200).json({ success: true, message: "Users Retrived Sucessfully", data: result.rows });


    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });
    }
})



export const userRoute = router;