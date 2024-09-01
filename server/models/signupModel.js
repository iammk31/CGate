import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';

// This is the Signup Page

const signupSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be of at least 3 Characters."],
    maxLength: [30, "First name cannot exceed 30 Characters."],
  },
  lastName: {
    type: String,
    required: false,
    // minLength: [3, "Last name must be of at least 3 Characters."],
    // maxLength: [30, "Last name cannot exceed 30 Characters."],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Last name must be of at least 6 Characters."],
    maxLength: [18, "Last name cannot exceed 18 Characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain 10 Digits."],
    maxLength: [10, "Phone number must contain 10 Digits."],
  },
  uType: {
    type: String,
    required: true,
  },
});

signupSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});
export const Signup = mongoose.model("Signup", signupSchema);