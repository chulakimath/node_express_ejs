import Mongoose, { Schema } from "mongoose";
const blogSchema= new Mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:"String",
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const BlogModule = Mongoose.model("Blog",blogSchema)