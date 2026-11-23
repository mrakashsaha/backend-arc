import express from "express";

const app = express();


app.get("/", (req, res)=> {
    res.send("Hello Reader...")
})



export default app;