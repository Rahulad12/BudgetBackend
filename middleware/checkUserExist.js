import User from "../model/User.js";
export const checkUserExist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        next();

    } catch (error) {
        console.log(error)
    }
}
