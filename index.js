import express from "express";
import dontenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRoute.js";
import StaticRouter from"./routes/staticRouter.js";
import BolgRoute from "./routes/blogRoute.js";
import { mongoConnection } from "./services/mongoService.js";
import cookieParser from "cookie-parser";
import { isUserAuthenticated } from "./middleware/authMiddleware.js";
dontenv.config();
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(isUserAuthenticated("_token"));
app.use(express.static('public'));
app.get("/", (req, res) => {
    
    res.render("home", {
        user: req.user || null,
        // profileImageUrl:req.cookies.profileImageUrl
    });
})
app.use("/user", userRouter);
app.use("/blog",BolgRoute);
app.use("/static",StaticRouter)
mongoConnection("blogApp").then(() => {
    console.log("DB Connection Extablished");
    app.listen(PORT, () => {
        console.log(`http://127.0.0.1:${PORT}`);
    })
})
