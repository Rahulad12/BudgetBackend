import express from "express";
import { authUser, createUser } from "../controller/authController.js";

const authRouter = express.Router();

// Route for user authentication
authRouter.post("/login", authUser);
authRouter.post("/register", createUser);

export default authRouter;



