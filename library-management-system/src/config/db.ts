
import pg from "pg";
import config from "./index.js";

const {Pool} = pg;
export const pool = new Pool({
    connectionString: config.connectionString,
});