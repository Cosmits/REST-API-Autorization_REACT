import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./router.js";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.static("media"));
app.use(fileUpload({}));
const corsOptions = {
    origin: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
    maxAge: 3600
};

app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
))

app.use("/api", router);

app.get("/", (req, res) => {
    console.log(req.query);
    // console.log(req.query.qwe);
    res.status(200).json("Server Worked GET");
});

// app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`))

async function startApp() {
    try {
        // console.log(DB_URL);
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        app.listen(PORT, () => console.log(`Server start = ${process.env.API_URL}`));
    } catch (error) {
        console.log(error);
    }
}

await startApp();
