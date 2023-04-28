import customeAPIErrors from "../errors/custom_error";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { config } from "../config/config";
import { verifyJWT } from "../utils/jwt";
import User from "../model/user";



export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token;
  if(!token) {
    return next(new customeAPIErrors(StatusCodes.UNAUTHORIZED, "Please Login to access this route"));
  }
  try {
    const payload = verifyJWT(token) as any;
    req.user = payload;
    next();
  } catch (error) {
    return next(new customeAPIErrors(StatusCodes.UNAUTHORIZED, "Please Login to access this route"));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!roles.includes(req.user.role)) {
      return next(new customeAPIErrors(StatusCodes.FORBIDDEN, "You are not authorized to access this route"));
    }
    next();
  };
};

export const CheckBlockUser = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies.token;
    if(!token) {
        return next(new customeAPIErrors(StatusCodes.UNAUTHORIZED, "Please Login to access this route"));
    }
    try {
        const payload = verifyJWT(token) as any;
        const user = await User.findById(payload.id);
        if(user?.status ==="blocked"){
            return next(new customeAPIErrors(StatusCodes.UNAUTHORIZED, "You are blocked by libranian, please contact to libranian"));
        }
        next();
    } catch (error) {
        return next(new customeAPIErrors(StatusCodes.UNAUTHORIZED, "Please Login to access this route"));
    }
}



