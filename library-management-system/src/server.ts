import app from "./app.js";
import { pool } from "./config/db.js";
import config from "./config/index.js";
import { initDatabase } from "./config/initDB.js";

const startServer = async () => {

    try {

        const time = await pool.query(`SELECT NOW()`);

        console.log("Database connected! Current Time: ", time.rows[0].now);

        initDatabase();

        app.listen(config.port, () => {
            console.log("Libary Management server is running on PORT =", config.port);
        })

    } 
    
    catch (error) {
        console.error("Failed to connect to server. Details: ", error);

    }
}

startServer();