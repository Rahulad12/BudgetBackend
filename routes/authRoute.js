import express from "express";
import { authUser, createUser, getUser, updateUser, passwordChange } from "../controller/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import { authValidation,createUserValidation } from "../utils/formValidator.js";
const authRouter = express.Router();

// Route for user authentication
authRouter.post("/login", authValidation,authUser);
authRouter.post("/register", createUserValidation,createUser);
authRouter.get("/user", authenticate, getUser);
authRouter.put("/user/update", authenticate, updateUser);
authRouter.put("/user/password", authenticate, passwordChange);

export default authRouter;



