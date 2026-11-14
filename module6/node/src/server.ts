import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import routeHandler from './routes/route.ts';
import config from './config/index.ts';



const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request", req);

    // console.log("Response:", res);

    routeHandler(req, res);

});

server.listen(config.port, () => {
    console.log("Server is running successfully", config.port);
    console.log(config.port)
})