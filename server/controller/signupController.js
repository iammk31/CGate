// import { isStrongPassword } from "validator";
import ErrorHandler from "../error/error.js";
import { Signup } from "../models/signupModel.js";
import jwt from "jsonwebtoken"

const send_signup = async (req, res, next) => {
    const { firstName, lastName, email, password, phone,uType } = req.body;
    if (!firstName  || !email || !password || !phone) {
        return next(new ErrorHandler("Please Fill The Form!", 400));
    }
    console.log(firstName, lastName, email, password, phone,uType);
    
    try {
        // console.log("inside try");
        
        const userExists = await Signup.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("User already exists!", 409));
        }
        const user = await Signup.create({ firstName, lastName, email, password, phone,uType });
        const token = jwt.sign({ id: user.email, uType: user.uType }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        
        // console.log(token);
        
        res.status(201).json({
            success: true,
            message: "Form Sent Successfully!",
            token,
            user
        });


    } catch (error) {
        console.log("inside catch");
        console.log(error);
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(', '), 400));
        }

        // Handle other errors
        return next(error);
    }

};

export default send_signup;