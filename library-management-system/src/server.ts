import app from "./app.js";

const port: number = Number(process.env.PORT) || 5000;

const startServer = () => {

    try {
        app.listen(port, () => {
            console.log("Libary Management server is running on PORT = ", port);
        })

    } 
    
    catch (error) {
        console.error("Failed to connect to server. Details: ", error);
        
    }
}

startServer();