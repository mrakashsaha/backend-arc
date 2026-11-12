import { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller.ts";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;

    const method = req.method;

    if (url === "/" && method === "GET") {
        console.log("This is root route");
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is route endPoint" }))
    }


    else if (url?.startsWith("/products") && method === "GET") {
        productController(req, res);
    }

    else {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is route is not a valid endpoint" }))
    }

}

export default routeHandler;