import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    phone: {
        type: Number,
        unique: true,
    },
    income: {
        type: Number,
    },
    profile_img: {
        type: String
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema)