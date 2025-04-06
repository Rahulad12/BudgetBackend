import jwt from "jsonwebtoken"

export const tokenGenerator = (res, userid) => {
    const token = jwt.sign({
        userid
    },
        process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token
}
