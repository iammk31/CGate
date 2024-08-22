import express from "express";
import send_signup from "../controller/signupController.js";
import send_login from "../controller/loginController.js";
import { video_router } from "../controller/videoController.js";

const router = express.Router();

router.post("/send", send_signup);

router.post("/login", send_login);

router.get("/videos", video_router);


export default router;