import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["Doctor", "Admin", "Patient", "Receptionist"],
            required: true,
        },

        otp: {
            type: String,
            default: null
        },

        otpExpiry: {
            type: Date,
            default: null
        },

        isVerified: {
            type: Boolean,
            default: false
        },
        // subscriptionPlan: {
        //   type: String,
        //   enum: ["Free", "Basic", "Premium"],
        //   default: "Free",
        // },

        // isActive: {
        //   type: Boolean,
        //   default: true,
        // },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'users');
export default User;