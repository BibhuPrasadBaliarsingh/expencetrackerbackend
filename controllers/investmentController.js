import mongoose from "mongoose";
import Investment from "../models/Investment.js";

// GET /api/investments
export const getInvestments = async (req, res, next) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).sort({
      investmentDate: -1,
      createdAt: -1,
    });
    return res.json(investments);
  } catch (err) {
    return next(err);
  }
};

// POST /api/investments
export const addInvestment = async (req, res, next) => {
  try {
    const { title, investmentType, investedAmount, interestRate, investmentDate, remarks } = req.body || {};

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!investmentType) return res.status(400).json({ message: "Investment type is required" });
    if (investedAmount === undefined || investedAmount === null) {
      return res.status(400).json({ message: "Invested amount is required" });
    }
    if (!investmentDate) return res.status(400).json({ message: "Investment date is required" });

    const investment = await Investment.create({
      userId: req.user.id,
      title: String(title),
      investmentType: String(investmentType),
      investedAmount: Number(investedAmount),
      interestRate: interestRate === undefined ? 0 : Number(interestRate),
      investmentDate: new Date(investmentDate),
      remarks: remarks ? String(remarks) : "",
    });

    return res.status(201).json(investment);
  } catch (err) {
    return next(err);
  }
};

// PUT /api/investments/:id
export const updateInvestment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid investment id" });

    const investment = await Investment.findOne({ _id: id, userId: req.user.id });
    if (!investment) return res.status(404).json({ message: "Investment not found" });

    const { title, investmentType, investedAmount, interestRate, investmentDate, remarks } = req.body || {};

    if (title !== undefined) investment.title = String(title);
    if (investmentType !== undefined) investment.investmentType = String(investmentType);
    if (investedAmount !== undefined) investment.investedAmount = Number(investedAmount);
    if (interestRate !== undefined) investment.interestRate = Number(interestRate);
    if (investmentDate !== undefined) investment.investmentDate = new Date(investmentDate);
    if (remarks !== undefined) investment.remarks = String(remarks);

    const updated = await investment.save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/investments/:id
export const deleteInvestment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid investment id" });

    const deleted = await Investment.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Investment not found" });

    return res.json({ message: "Investment deleted" });
  } catch (err) {
    return next(err);
  }
};

