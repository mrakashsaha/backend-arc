import { IncomingMessage } from "http";

export const bodyParser = (req: IncomingMessage): Promise<any> => {
    let body = "";
    return new Promise<any>((resolve, reject) => {
        req.on("data", (chunk) => {
            body = body + chunk;
        })

        req.on("end", ()=> {
            try {
                resolve(JSON.parse(body))
            }
            catch(error) {
                reject(error);
            }
        });
    })
}