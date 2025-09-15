import express from "express";
import dontenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRoute.js";
import {mongoConnection} from "./services/mongoServeice.js";
dontenv.config();
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
})
app.use("/user", userRouter);

mongoConnection("blogApp").then(() => {
    console.log("DB Connection Extablished");
    app.listen(PORT, () => {
        console.log(`http://127.0.0.1:${PORT}`);
    })
})
