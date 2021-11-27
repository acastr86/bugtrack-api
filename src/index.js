import express from 'express';
import helmet from 'helmet';
import cors from "cors";


import config from './utils/config';
import logger from './utils/logger';
import errors from './utils/errors';
import auth from './utils/auth';

import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(logger.middleware);
app.use(helmet());
app.use(cors({
    origin: config.origin
}));

app.use(auth.initialize());
app.use(router);

app.use(errors.notFound);
app.use(errors.errorHandler);

app.listen(config.port);