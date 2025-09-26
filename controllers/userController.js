import userModel from "../models/usersModel.js";
import { createHmac } from "crypto";
import { createToken, validateToken } from "../services/authService.js";



export const sigin = async (req, res) => {
    return res.render("signin");
}
export const sigup = async (req, res) => {
    return res.render("signup");
}
export const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findByCredentials(email, password);
        if (user) {
            const token = await createToken(user);
            console.log(token);
            res.cookie("user", user.fullname);
            res.cookie("profileImageUrl", user.profileImageUrl);
            res.cookie("_token", token);
            return res.redirect("/");
        }
        return res.render("signin", { error: "Invalid email or password" });

    } catch (error) {
        console.log(error);
        return res.render("signin", { error: error.message });
        // return res.status(500).send("Internal Server Error", error)
    }
}
export const userSignUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(fullname, email, password)
    try {
        const user = await userModel.create({
            fullname,
            email,
            password,
        });
    } catch (error) {
        console.log(error);
    }
    return res.redirect("/");

}

export const userlogout = (req, res) => {
    res.clearCookie("user");
    res.clearCookie("profileImageUrl");
    res.clearCookie("_token");
    return res.redirect("/");
}