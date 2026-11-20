import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

const main = async () => {

    initDB();

    app.listen(config.port, () => {
        console.log("Express server is listening on port", config.port);
    })
}

main();