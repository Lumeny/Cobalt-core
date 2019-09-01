import logger from './logger/index';
import { API } from './api/index';

let api = new API();

api.listen(3000);

logger.log('Logger fonctionne !')