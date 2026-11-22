import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRoute } from "./modules/auth/auth.route.js";
import fs from "fs";
import logger from "./middlewire/logger.js";
import globalErrorHandeler from "./middlewire/globalErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app: Application = express();

const corsOption = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Custom middlewire creating logger.txt file
app.use(logger);


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ sucess: true, author: "Ex-Server", message: "I am route route" });
})

// User Route
app.use("/api/v1/users", userRoute);

// Prfoile Route
app.use("/api/v1/profile", profileRoute);

app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandeler);

export default app;