import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { userRouter, groupRouter, loginRouter } from './routers';
import {
  internalServerErrorHandler,
  consoleLogger,
  logger,
  authentication,
} from './middlewares';
import config from './config/config';

dotenv.config();

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const app = express();

// App configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(consoleLogger);
// app.use(notFound)
app.use(internalServerErrorHandler);
app.use('/api/login', loginRouter);
app.use('/api/users', authentication, userRouter);
app.use('/api/groups', authentication, groupRouter);

app.get('*', function (req, res) {
  res.status(404).send('Route not found');
});

process.on('uncaughtException', (error, source) => {
  logger.error(`${source}: ${error}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection at: ', promise, 'reason: ', reason);
});

const PORT = config.application_port;

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});

export { app };
