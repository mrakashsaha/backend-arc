import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";

const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ sucess: true, author: "Ex-Server", message: "I am route route" })
})

// User Route
app.use("/api/v1/users", userRoute);

// Prfoile Route
app.use("/api/v1/profile", profileRoute);

export default app;