import express from "express";
import cors from "cors";

const app = express();

app.use(cors({origin: "http://localhost:3000/"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=> {
    res.send("Hello Reader...")
})



export default app;