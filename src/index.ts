import logger from './logger/index';
import { API } from './api/index';

class Main {
    private api : API;

    constructor() {
        this.api = new API();
    }

    public start() {
        this.api.listen(3000);
        logger.log('Everything started.', 'Main');
    }
}

let main = new Main();
main.start();