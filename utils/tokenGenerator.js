import jwt from "jsonwebtoken"

export const tokenGenerator = (userId) => {
    const token = jwt.sign({
        _id: userId,
    },
        process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token
}
