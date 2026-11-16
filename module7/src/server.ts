import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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


app.post("/api/v1/users", async (req: Request, res: Response) => {

    try {
        const { name, email, password, age } = req.body;

        const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age])

        console.log(result.rows[0]);

        res.status(200).json({ success: true, message: "User Created Sucessfully", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, error: error });

    }

})

app.listen(port, () => {
    console.log("Express server is listening on port", port);
})
