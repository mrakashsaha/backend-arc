import express, { type Application, type Request, type Response } from "express";

const app: Application = express ();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response)=> {
    res.status(200).json({sucess: true, author: "Ex-Server", message: "I am route route"})
})


app.post("/", (req: Request, res: Response)=> {
    console.log(req.body);
})

app.listen(port, ()=> {
    console.log("Express server is listening on port", port);
})
