import express from 'express';

class API {
    private app : express.Express;

    constructor() {
        this.app = express();
        this.app.get("/", (req, res) => {
            res.send("Hello world !");
        });
    }

    public listen(port : number) {
        this.app.listen(port, () => {
            console.log('API server running on port ' + port.toString());
        })
    }
}

export {API};