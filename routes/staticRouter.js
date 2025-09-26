import express from "express";
import {addBlog} from "../controllers/staticController.js"
const Router = express.Router();
Router.use("/",addBlog)

export default Router;