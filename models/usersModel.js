import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";


const Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "assets/images/users.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }


}, {
    timestamps: true,
});

Schema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return;
    }
    const salt = randomBytes(16).toString("hex");
    const hashedPasswod = createHmac("sha256", salt).update(user.password).digest("hex");
    user.password = hashedPasswod;
    user.salt = salt;
    user.password = hashedPasswod;
    next();
});

const userModel=new mongoose.model("User", Schema);
export default userModel;