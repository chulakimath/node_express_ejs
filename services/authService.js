import JWT from "jsonwebtoken";
// import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRATE = process.env.JWT_SECRATE;


export const createToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        profileImageUrl: user.profileImageUrl
    }
    const token = JWT.sign(payload,JWT_SECRATE)
    return token;
}

export const validateToken = (token) => {
    return JWT.verify(token, JWT_SECRATE);
}