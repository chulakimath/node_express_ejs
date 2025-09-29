import { BlogModule } from "../models/blogSchema.js";
import { CommentModel } from "../models/commentsSchema.js"
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
        return res.render("showBlog", { user: req.user, error: "No Such Blog Exists" })
    }
    const blog = await BlogModule.findById(blogId).populate({
        path: "createdBy",
        select: "-password -createdAt -updatedAt -salt -__v -role"
    })
    const comments = await CommentModel.find({ 'blogId': blogId }).populate({
        path: "commentedBy",
        select: "-password -createdAt -updatedAt -salt -__v -role"
    }).sort({ createdAt: 1 });

    if (blog) {
        return res.render("showBlog", { user: req.user, data: blog, dataComments: comments });
    }
    return res.render("showBlog", { user: req.user, error: "No Such Blog Exists" })
}


export const getBlogs = async () => {
    return await BlogModule.find({}).sort({ 'createdAt': -1 });
}

export const createComment = async (req, res) => {
    const blogId = req.params.blogId;
    const userComment = req.body.comment || ""
    if (!userComment.trim()) {
        return res.redirect(`/blog/post/${blogId}`)
    }
    if (!req.user._id) {
        return res.status(402).json({ error: "User Not Loggedin Please login to comment" })
    }
    await CommentModel.create({
        comment: userComment,
        blogId: blogId,
        commentedBy: req.user._id
    });
    return res.redirect(`/blog/post/${blogId}`)

}
