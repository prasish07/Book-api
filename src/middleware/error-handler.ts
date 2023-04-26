import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
    });
};