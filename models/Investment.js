import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    investmentType: {
      type: String,
      required: [true, "Investment type is required"],
      trim: true,
    },
    investedAmount: {
      type: Number,
      required: [true, "Invested amount is required"],
      min: 0,
    },
    interestRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    investmentDate: {
      type: Date,
      required: [true, "Investment date is required"],
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;

