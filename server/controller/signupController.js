// import { isStrongPassword } from "validator";
import ErrorHandler from "../error/error.js";
import { Signup } from "../models/signupModel.js";

const send_signup = async (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !phone) {
        return next(new ErrorHandler("Please Fill The Form!", 400));
    }

    try {
        await Signup.create({ firstName, lastName, email, password, phone });
        res.status(201).json({
            success: true,
            message: "Form Sent Successfully!",
        });

    } catch (error) {
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