export const authValidation = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }
    next();
}

export const createUserValidation = (req, res, next) => {
    const { username, email, password } = req.body;

   

    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    //regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" })
    }

    //password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;
    const lengthRegex = /^.{6,}$/;

    if (!uppercaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!lowercaseRegex.test(password)) {
        return "Password must contain at least one lowercase letter";
    }
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }
    if (!numberRegex.test(password)) {
        return "Password must contain at least one number";
    }
    if (!lengthRegex.test(password)) {
        return "Password must be at least 6 characters long";
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ success: false, message: "Username must be at least 3 characters long and can only contain letters, numbers, and underscores" });
    }

    if (username.length > 20) {
        return res.status(400).json({ success: false, message: "Username must be at most 20 characters long" });
    }
    next();
}