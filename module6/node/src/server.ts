import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import routeHandler from './routes/route.ts';

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request", req);

    // console.log("Response:", res);

    routeHandler(req, res);

});

server.listen(5000, () => {
    console.log("Server is running successfully");
})