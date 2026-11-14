import { ServerResponse } from "node:http";

export const sendResponse = async (res: ServerResponse, success: boolean, statusCode: number, message: string, data?: any) => {
    const respone = {
        success,
        message,
        data,
    }

    console.log(respone);
    res.writeHead(statusCode, { "Content-Type": "application/json" })
    res.end(JSON.stringify(respone))

}