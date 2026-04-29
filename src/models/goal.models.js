import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    targetAmount:{
        type: Number,
        required: true,
    },
    savedAmount: {
        type: Number
    },
    tenureMonths: {
        type: Number    
    },
    lastdate: {
        type: Date
    },
    description: {
        type: String
    }
},{timestamps:true})

export const Goal = mongoose.model("Goal", goalSchema)