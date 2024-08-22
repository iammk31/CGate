import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import cgateRouter from "./routes/cgateRoute.js";


const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
// console.log('YOUTUBE_API:', process.env.YOUTUBE_API);
// console.log('Playlist_ID:', process.env.PLAYLIST_ID);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/v1/cgate", cgateRouter);
// app.get("/", (req, res, next)=>{return res.status(200).json({
//   success: true,
//   message: "HELLO WORLD AGAIN"
// })})

dbConnection();

app.use(errorMiddleware);

export default app;