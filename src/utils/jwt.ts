import jwt from "jsonwebtoken";
import { Response } from 'express';
import { config } from "../config/config";


interface ITokenPayload {
    id: string;
    role: string;
}

export const createJWT = ({payload}:any) => {
  return jwt.sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.lifetime,
  });
}

export const verifyJWT = (token: string) => {
    return jwt.verify(token, config.jwt.secret!);
}

export const attachCookiesToResponse = ({
  res,
  tokenPayload,
}: {
  res: Response,
  tokenPayload: ITokenPayload,
}) => {
    const token = createJWT({payload: tokenPayload});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + oneDay),
        signed:true
    });
}