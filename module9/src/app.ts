import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRoute } from "./modules/auth/auth.route.js";
import fs from "fs";

const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use ((req: Request, res: Response, next)=> {
    // console.log("Time->Method->URL", Date.now(), req.method, req.url);

    const log = `\nMethod: ${req.method} | URL ${req.url} | Time: ${Date.now()}\n`;
    
    fs.appendFile("logger.txt", log, (err)=> {
        err && console.log(err)
    })
    next();
})


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ sucess: true, author: "Ex-Server", message: "I am route route" });
})

// User Route
app.use("/api/v1/users", userRoute);

// Prfoile Route
app.use("/api/v1/profile", profileRoute);

app.use("/api/v1/auth", authRoute);

export default app;