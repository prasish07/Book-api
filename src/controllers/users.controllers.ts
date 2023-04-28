import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import  User  from "../model/user"
import customeAPIErrors from '../errors/custom_error';
import { comparePassword } from '../utils/password';
import { attachCookiesToResponse } from '../utils/jwt';

export const createuser = async (req: Request, res: Response) => {
        const {email,password} = req.body;
        const emailAlreadyExist = await User.findOne({email});
        if(emailAlreadyExist){
            throw new customeAPIErrors(StatusCodes.BAD_REQUEST,"Email already exist");
        }
        if(req.body.role==="admin"){
            throw new customeAPIErrors(StatusCodes.BAD_REQUEST,"You cannot create admin");
        }
        const user = new User(req.body);
        const result = await user.save();
        res.status(StatusCodes.CREATED).json(result);

};

export const login = async (req: Request, res: Response) => {
        if(!req.body.email || !req.body.password){
            throw new customeAPIErrors(StatusCodes.BAD_REQUEST,"Please provide email and password");
        }
        const user = await User.findOne({email:req.body.email});
        if(!user){
            throw new customeAPIErrors(StatusCodes.BAD_REQUEST,"Invalid credentials");
        }
        const isMatch:boolean = await comparePassword(req.body.password,user.password);
        if(!isMatch){
            throw new customeAPIErrors(StatusCodes.UNAUTHORIZED,"Invalid credentials");
        }
        const tokenPayload = {
            id: user._id,
            role: user.role,
        }
        attachCookiesToResponse({res,tokenPayload});

        res.status(StatusCodes.OK).json({status:"success",msg:"User logged in successfully",user});
}

export const getAllUser = async (req: Request, res: Response) => {
        const users = await User.find();
        res.status(StatusCodes.OK).json(users);
}