import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true,
    }

},{timestamps:true})
export const CommentModel = mongoose.model('Comment', commentSchema); 