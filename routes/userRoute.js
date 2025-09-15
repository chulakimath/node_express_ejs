import express from "express";
import {sigin,sigup,userSignin,userSignUp} from "../controllers/userController.js";
const UserRouter=express.Router();

// sigin
UserRouter.get("/signin",sigin)
UserRouter.post("/signin",userSignin)
// signup
UserRouter.get("/signup",sigup)
UserRouter.post("/signup",userSignUp)
export default UserRouter;