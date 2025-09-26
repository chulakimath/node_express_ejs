import { BlogModule } from "../models/blogSchema.js";
export const addBlog = async (req, res) => {
    res.render("addBlog", { user: req.user })
}
export const addBlogPost = async (req, res) => {
    if (!req.body.title || !req.body.body) {
        return res.render("addBlog", { user: req.user, error: "Missing Information" })
    }
    const blogOj = {
        title: req.body.title,
        body: req.body.body,
        createdBy: req.user._id,
        coverImageUrl: req.file.filename ?? ""
    }
    try {
        const created = await BlogModule.create(blogOj)
        return res.redirect(`/blog/post/${created._id}`);
    } catch (error) {

    }
}
export const getBlogById = async (req, res) => {
    const blogId = req.params.blogId ?? null;
    if (!blogId) {
        return res.render("showBlog", { error: "No Such Blog Exists" })
    }
    const blog = await BlogModule.findById(blogId)
   
    if (blog) {
        return res.render("showBlog", {data:blog});
    }
    return res.render("showBlog", { error: "No Such Blog Exists" })
}