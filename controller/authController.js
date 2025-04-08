import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../utils/tokenGenerator.js";

const authUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ username: username, email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isAuth = await bcrypt.compare(password, user.password);

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
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const createUser = async (req, res) => {
    let { username, email, password } = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase().replace(/\s+/g, '');
    try {
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })
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

const getUser = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        return res.status(200).json({ success: true, data: user })
    } catch (error) {

    }
}
const updateUser = async (req, res) => {
    const userId = req.user._id;
    const { username, email } = req.body;
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not updated" })
        }

        return res.status(200).json({ success: true, message: "User Updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const passwordChange = async (req, res) => {
    const userId = req.user._id;
    const { currentpassword, password } = req.body;

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isPassword = await bcrypt.compare(currentpassword, existingUser.password);
        if (!isPassword) {
            return res.status(400).json({ success: false, message: "Current Password Donot Match" })
        }

        const isPasswordExist = await bcrypt.compare(password, existingUser.password);
        if (isPasswordExist) {
            return res.status(400).json({ success: false, message: "Password already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not updated" })
        }

        return res.status(200).json({ success: true, message: "Password Changed" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export { authUser, createUser, getUser, updateUser, passwordChange };