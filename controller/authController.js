import User from "../model/User";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../utils/tokenGenerator";

const authUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const isAuth = bcrypt.compare(password, user.password);
        if (!isAuth) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentails"
            })
        }
        const token = tokenGenerator(user._id)
        res.status(200).json({
            success: true,
            message: "Login SuccessFull",
            token
        })
    } catch (error) {

    }
}

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username, email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exsit"
            })
        }
        //Hashed Password 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if (user) {
            return res.status(201).json({ success: true, message: "User created" });
        } else {
            return res.status(400).json({ success: false, message: "User not created" });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { authUser, createUser };