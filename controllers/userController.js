import userModel from "../models/usersModel.js";

export const sigin = async (req, res) => {
    return res.render("signin");
}
export const sigup = async (req, res) => {
    return res.render("signup");
}
export const userSignin = async (req, res) => {
    return res.render("signin");
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