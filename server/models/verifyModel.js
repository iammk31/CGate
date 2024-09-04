import mongoose from "mongoose";

const verifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 300 }
});

export const Verify = mongoose.model("Verify", verifySchema);
