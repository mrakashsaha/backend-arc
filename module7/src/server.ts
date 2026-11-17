import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
import config from "./config/index.js";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool({ connectionString: config.connectionString});

const initDB = async () => {
    try {

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_Active BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW());
        `)
        console.log("Sucessfully Concected with PGDB")

    }

    catch (error) {
        console.log(error);
    }
}

initDB();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ sucess: true, author: "Ex-Server", message: "I am route route" })
})

// Post a single user
app.post("/api/v1/users", async (req: Request, res: Response) => {

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

})

// get all users
app.get("/api/v1/users", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`
            SELECT * FROM users;
            `)

        res.status(200).json({ success: true, message: "Users Retrived Sucessfully", data: result.rows });


    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });
    }
})


// Get a users
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id]);

        if (result.rowCount === 0) {

            res.status(404).json({ success: false, message: "User Not Found"});
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

            res.status(404).json({ success: false, message: "User Not Found"});
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

            res.status(404).json({ success: false, message: "User Not Found"});
            return;
        }
        res.status(500).json({ success: true, message: "User deleted successfully", data: result.rows[0] });


    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });
    }

})


app.listen(port, () => {
    console.log("Express server is listening on port", port);
})
