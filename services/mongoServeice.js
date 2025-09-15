import mongoose from "mongoose";

export const mongoConnection = (db)=>{
    return mongoose.connect(`mongodb://127.0.0.1:27017/${db}`)
}