import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import  Book  from "../model/book"

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        const result = await book.save();
        res.status(StatusCodes.CREATED).json(result);
    } catch (err:any) {
        throw new Error(err.message.toString());
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
        const result = await Book.find();
        if(!result){
            throw new Error("No books found");
        }
        res.status(StatusCodes.OK).json({status:"success",result});
}

export const getSingleBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const result = await Book.findById(bookId);
        if(!result){
            throw new Error("No books found");
        }
        res.status(StatusCodes.OK).json({status:"success",result});
}

export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const result = await Book.findByIdAndUpdate(bookId,req.body,{new:true,runValidators:true});
        if(!result){
            throw new Error("No books found");
        }
        res.status(StatusCodes.OK).json({status:"success",result});
}

export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;

    const result = await Book.findByIdAndDelete(bookId);
        if(!result){
            throw new Error("No books found");
        }
        res.status(StatusCodes.OK).json({status:"success",msg:"Book deleted successfully"})
}