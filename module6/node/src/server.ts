import { createServer, IncomingMessage, Server, ServerResponse } from 'http';

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request", req);

    // console.log("Response:", res);

    console.log(req.url);
    console.log(req.method);


    const url = req.url;

    const method = req.method;

    if (url === "/" && method === "GET") {
        console.log("This is root route");
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is route endPoint" }))
    }


    else if (url?.startsWith("/products") && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is Product endPoint" }))
    }

    else {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "This is route is not a valid endpoint" }))
    }


});

server.listen(5000, () => {
    console.log("Server is running successfully");
})