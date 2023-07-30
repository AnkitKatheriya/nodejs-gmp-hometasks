import { NextFunction, Request, Response } from 'express';
import { CONSOLE_COLORS } from '../constants/colors';

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const consoleLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const current_datetime = new Date();
  const formatted_date =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const reqParams = req.params;
  const reqBody = req.body;
  const log = `[${formatted_date}] ${method}:${url} ${status} params: ${JSON.stringify(
    reqParams
  )} body: ${JSON.stringify(reqBody)} ${durationInMilliseconds}ms`;
  console.log(CONSOLE_COLORS.FgCyan, log);
  next();
};
