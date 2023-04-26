import { Router, Request, Response } from "express";
import {createBook,getAllBooks,getSingleBook,updateBook,deleteBook} from "../controllers/book.controllers"

const router = Router();

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

export default router;