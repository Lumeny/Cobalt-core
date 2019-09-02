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

        this.app.get('/users', (req, res) => {
            res.json({ users : 'no users'});
        });

        this.app.get('/users/:uid', (req, res) => {
            res.json({ user : { uid : req.params.uid }});
        });
    }

    public listen(port : number) {
        this.app.listen(port, () => {
            logger.log('[API] server running on port ' + port.toString());
        });
    }
}

export {API};