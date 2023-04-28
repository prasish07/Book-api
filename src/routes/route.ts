import { Router, Request, Response } from "express";
import { createBook, getAllBooks, getSingleBook, updateBook, deleteBook,blockUser } from "../controllers/book.controllers";
import { authenticate, authorize,CheckBlockUser } from "../middleware/authenticate";

const router = Router();

router.route("/")
  .post(authenticate, authorize("admin","librarian"), createBook)
  .get(authenticate,CheckBlockUser,getAllBooks);

router.route("/:id")
  .get(authenticate,CheckBlockUser,getSingleBook)
  .patch(authenticate, authorize("admin"), updateBook)
  .delete(authenticate, authorize("admin"), deleteBook);

router.route("/block/:id").patch(authenticate, authorize("admin","librarian"), blockUser);

export default router;
