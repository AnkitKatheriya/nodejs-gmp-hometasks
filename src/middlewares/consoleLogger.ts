import { NextFunction, Request, Response } from "express";
import { CONSOLE_COLORS } from "../constants/colors";

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
   let reqParams = req.params;
   let reqBody = req.body;
   let log = `[${formatted_date}] ${method}:${url} ${status} params: ${JSON.stringify(reqParams)} body: ${JSON.stringify(reqBody)}`;
   console.log(CONSOLE_COLORS.FgCyan, log);
   next()
}