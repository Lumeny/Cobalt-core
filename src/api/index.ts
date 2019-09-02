import logger from '../logger/index';
import express from 'express';

class API {
    private app : express.Express;

    constructor() {
        this.app = express();
        this.routes();
    }

    private routes(): void {
        this.app.get("/", (req, res) => {
            res.send("API server is running fine !");
        });
    }

    public listen(port : number) {
        this.app.listen(port, () => {
            logger.log('[API] server running on port ' + port.toString());
        });
    }
}

export {API};