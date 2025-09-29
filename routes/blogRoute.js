import express from "express";
import {addBlog,addBlogPost,getBlogById,createComment} from "../controllers/blogController.js"
import {uploadService} from "../services/uploadService.js";
const Router = express.Router();
Router.get("/",addBlog)
Router.post("/",uploadService.single("image"),addBlogPost)
Router.get("/post/:blogId",getBlogById)
Router.post('/comment/:blogId',createComment)

export default Router;