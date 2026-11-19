
import { Pool } from "pg";
import config from "../config/index.js";

export const pool = new Pool({ connectionString: config.connectionString });

export const initDB = async () => {
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


        await pool.query(`
        CREATE TABLE IF NOT EXISTS profile(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCES users (id) ON DELETE CASCADE,
            bio TEXT,
            address TEXT,
            phone VARCHAR (15),
            gender VARCHAR (10),
            createdAt TIMESTAMP DEFAULT NOW(),
            updatedAt TIMESTAMP DEFAULT NOW()
        );  
        
        `)

    }

    catch (error) {
        console.log(error);
    }
}

