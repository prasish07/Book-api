import { Router, Request, Response } from "express";
import {createuser,login,getAllUser} from "../controllers/users.controllers"
import { authenticate, authorize } from "../middleware/authenticate";

const router = Router();

router.route("/").post(createuser).get(authenticate,authorize("admin"),getAllUser);
router.route("/login").post(login);

export default router;