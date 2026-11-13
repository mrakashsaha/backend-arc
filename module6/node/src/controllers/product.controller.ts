import { IncomingMessage, ServerResponse } from "http";
import productService from "../service/product.service.ts";
import { IProduct } from "../types/product.ts";
import { bodyParser } from '../utils/parseBody';

const productController = async (req: IncomingMessage, res: ServerResponse) => {

    const method = req.method;
    const url = req.url;

    const products = productService();

    const urlParams = url?.split("/");

    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;


    // Get all products
    if (method === "GET" && id === null) {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Product Retrived", data: products }))
    }
    
    // Get a signle products
    else if (method === "GET" && id !== null) {

        const product = products.find((p: IProduct)=> p.id===id)

        // console.log(product)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Product Retrived", data: product}))
    }

    else if (method === "POST" && url==="/products") {

        const body = await bodyParser(req);

        console.log(body);

        res.writeHead(201, {"Content-Type": "applicatin/json"})
        res.end(JSON.stringify({message: "posted sucessfully"}))
    }

    else {

    }
}

export default productController;