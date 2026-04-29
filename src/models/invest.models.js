import mongoose from "mongoose";

const investSchema = new mongoose.Schema({

}, {timestamps: true})

export const Invest = mongoose.model("Invest", investSchema)