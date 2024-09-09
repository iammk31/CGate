import express from "express";
import send_signup, { sendOtp, verify_signup } from "../controller/signupController.js";
import send_login from "../controller/loginController.js";
import { video_router } from "../controller/videoController.js";
import { sendQuery } from '../controller/mailController.js'


const router = express.Router();

router.post("/send", send_signup);
router.post("/sendOtp", sendOtp)

router.post("/verify", verify_signup)
router.post("/login", send_login);

router.get("/videos", video_router);
router.post('/send-query', sendQuery);




export default router;