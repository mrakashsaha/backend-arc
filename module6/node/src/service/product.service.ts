import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { IProduct } from "../types/product.ts";

const filePath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {
    // console.log(process.cwd());
    // console.log(filePath);
    const result = readFileSync(filePath, "utf-8");

    return JSON.parse(result);
}

export const createProduct = (payload: IProduct[]) => {
    writeFileSync(filePath, JSON.stringify(payload));
}
