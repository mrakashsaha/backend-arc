import { IncomingMessage, ServerResponse } from "http";
import { IProduct } from "../types/product.ts";
import { bodyParser } from '../utils/parseBody';
import { createProduct, productService } from "../service/product.service.ts";
import { sendResponse } from "../utils/sendResponse.ts";

const productController = async (req: IncomingMessage, res: ServerResponse) => {

    const method = req.method;
    const url = req.url;

    const products = productService();

    const urlParams = url?.split("/");

    const id = urlParams && urlParams[1] === "products" && (urlParams[2]) !== undefined ? Number(urlParams[2]) : null;

    // Get all products
    if (method === "GET" && id === null) {
        console.log("here it is start")
        try {
            sendResponse(res, true, 200, "All Product Retrived", products);
        }
        catch (error) {
            sendResponse(res, false, 500, "Not showing any product ERROR")
        }
    }

    // Get a signle products
    else if (method === "GET" && id !== null) {


        const product = products.find((p: IProduct) => p.id === id);

        if (!product) {

            sendResponse(res, false, 404, "Product Not Found");

        }


        else {
            sendResponse(res, true, 200, "Product Retrive", product);

        }
    }

    else if (method === "POST" && url === "/products") {

        const body = await bodyParser(req);

        const newProduct = {
            id: Date.now(),
            ...body
        }

        products.push(newProduct);

        createProduct(products);

        sendResponse(res, true, 201, "Posted Sucessfully", newProduct);

    }


    else if (method === "PUT" && id !== null) {

        const body = await bodyParser(req);

        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {

            sendResponse(res, false, 404, "Product Not Found");

        }

        else {

            products[index] = { id: products[index].id, ...body }
            createProduct(products);

            sendResponse(res, true, 200, "Product Update Sucessfully", products[index]);

        }



    }


    else if (method === "DELETE" && id !== null) {

        const index = products.findIndex((p: IProduct) => p.id === id)

        if (index < 0) {

            sendResponse(res, false, 404, "Product Note Found to Delete");
        }

        else {

            products.splice(index, 1);
            createProduct(products);

            sendResponse(res, true, 200, "Product Deleted Sucessfully")

        }

    }

    else {

    }
}

export default productController;