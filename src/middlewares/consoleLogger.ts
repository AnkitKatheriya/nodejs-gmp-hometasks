import { NextFunction, Request, Response } from "express";
import { CONSOLE_COLORS } from "../constants/colors";


const getActualRequestDurationInMilliseconds = start => {
   const NS_PER_SEC = 1e9; // convert to nanoseconds
   const NS_TO_MS = 1e6; // convert to milliseconds
   const diff = process.hrtime(start);
   return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
 };

export const consoleLogger = (req: Request, res: Response, next: NextFunction) => {
   let current_datetime = new Date();
   let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
   let method = req.method;
   let url = req.url;
   let status = res.statusCode;
   const start = process.hrtime();
   const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
   let reqParams = req.params;
   let reqBody = req.body;
   let log = `[${formatted_date}] ${method}:${url} ${status} params: ${JSON.stringify(reqParams)} body: ${JSON.stringify(reqBody)} ${durationInMilliseconds}ms`;
   console.log(CONSOLE_COLORS.FgCyan, log);
   next()
}