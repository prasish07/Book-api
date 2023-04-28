import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import customeAPIErrors from '../errors/custom_error';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if(err instanceof customeAPIErrors){
        return res.status(err.statusCode).json({message: err.message})
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
    });
};