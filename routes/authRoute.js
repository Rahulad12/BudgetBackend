import express from "express";
import { authUser, createUser, getUser, updateUser, passwordChange } from "../controller/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import { authValidation, createUserValidation } from "../utils/formValidator.js";
const authRouter = express.Router();
import { checkUserExist } from "../middleware/checkUserExist.js";
// Route for user authentication
authRouter.post("/login", authValidation, authUser);
authRouter.post("/register", createUserValidation, createUser);
authRouter.get("/user", authenticate, checkUserExist, getUser);
authRouter.put("/user/update", authenticate, checkUserExist, updateUser);
authRouter.put("/user/password", authenticate, checkUserExist, passwordChange);

export default authRouter;



