import express from 'express';
import bodyParser from 'body-parser';

import { userRouter, groupRouter } from './routers';
import {
  internalServerErrorHandler,
  consoleLogger,
  logger,
} from './middlewares';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const app = express();

// App configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(consoleLogger);
// app.use(notFound)
app.use(internalServerErrorHandler);
app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
