import ErrorHandler from "../error/error.js";
import { Signup } from "../models/signupModel.js";
import {Verify } from "../models/verifyModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);

}
export const sendOtp = async (req, res, next) => {
    console.log(req.body);
    
    const { email } = req.body;
    console.log(email);
    

    if (!email) {
        return next(new ErrorHandler("Email is required!", 400));
    }

    try {
        // CHeck for existing user
        const userExists = await Signup.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("User already exists!", 409));
        }
        // Generate OTP
        const otp = generateOTP();

        // Save OTP and email to the database (upsert)
        await Verify.findOneAndUpdate(
            { email },
            { email, otp },
            { upsert: true, new: true }
        );

        // Configure Nodemailer to send the OTP email
        const transporter = nodemailer.createTransport({
            service: "Gmail", // You can use other email services
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.MY_GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MY_GMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
        });
    } catch (error) {
        next(error);
    }
};

const send_signup = async (req, res, next) => {
    const { firstName, lastName, email, password, phone, uType } = req.body;
    if (!firstName || !email || !password || !phone) {
        return next(new ErrorHandler("Please Fill The Form!", 400));
    }
    console.log(firstName, lastName, email, password, phone, uType);
    
    try {
        

        // const { firstName, lastName, password, phone, uType } = req.body;
        const user = await Signup.create({ firstName, lastName, email, password, phone, uType });

        // const token = jwt.sign({ id: user.email, uType: user.uType }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES_IN,
        // });

        await Verify.deleteOne({ email });

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            // token,
            // user
        });

    } catch (error) {
        console.log("inside catch");
        console.log(error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(', '), 400));
        }
        return next(error);
    }
};
export const verify_signup = async (req, res, next) => {
    const { email, otp } = req.body;

    try {
        const verifyRecord = await Verify.findOne({ email });
        if (!verifyRecord || verifyRecord.otp !== otp) {
            return next(new ErrorHandler("Invalid or expired OTP", 400));
        }
        // const { firstName, lastName, password, phone, uType } = req.body;
        // const user = await Signup.create({ firstName, lastName, email, password, phone, uType });

        // const token = jwt.sign({ id: user.email, uType: user.uType }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES_IN,
        // });

        // await Verify.deleteOne({ email });

        res.status(201).json({
            success: true,
            message: "otp verified successfully",
            // token,
            // user
        });
    } catch (error) {
        console.log("inside catch");
        console.log(error);
        return next(error);
    }
};

export default send_signup;
