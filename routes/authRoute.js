import express from "express";
import { authUser, createUser, getUser, updateUser, passwordChange } from "../controller/authController.js";
import authenticate from "../middleware/authMiddleware.js";
const authRouter = express.Router();

// Route for user authentication
authRouter.post("/login", authUser);
authRouter.post("/register", createUser);
authRouter.get("/user", authenticate, getUser);
authRouter.put("/user/update", authenticate, updateUser);
authRouter.put("/user/password", authenticate, passwordChange);

export default authRouter;



