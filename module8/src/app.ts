import express, { type Application, type Request, type Response } from "express";
import {pool } from "./db/index.js";
import { userRoute } from "./modules/users/user.route.js";

const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));




app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ sucess: true, author: "Ex-Server", message: "I am route route" })
})

// Post a single user
app.use("/api/v1/users", userRoute);

// get all users
app.use ("/api/v1/users", userRoute);

// Get a users


app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id]);

        if (result.rowCount === 0) {

            res.status(404).json({ success: false, message: "User Not Found" });
            return;
        }

        res.status(200).json({ success: true, message: "User Retrived Sucessfully", data: result.rows[0] });


    } catch (error: any) {

        res.status(500).json({ success: false, message: error.message, error: error });
    }
})

// Update a signle a user
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const { name, password, age, is_Active } = req.body;
        const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE ($1, name),
        password = COALESCE ($2, password),
        age = COALESCE ($3, age),
        is_Active = COALESCE ($4, is_Active),
        updatedAt = NOW()
        WHERE id = $5 RETURNING *`,
            [name ?? null, password ?? null, age ?? null, is_Active ?? null, id]);
        if (result.rowCount === 0) {

            res.status(404).json({ success: false, message: "User Not Found" });
            return;
        }

        res.status(201).json({ success: true, message: "User updated sucessfully", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });
    }
})


// Delete a user
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const result = await pool.query(`
        
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `, [id]);
        if (result.rowCount === 0) {

            res.status(404).json({ success: false, message: "User Not Found" });
            return;
        }
        res.status(500).json({ success: true, message: "User deleted successfully", data: result.rows[0] });


    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });
    }

})

export default app;