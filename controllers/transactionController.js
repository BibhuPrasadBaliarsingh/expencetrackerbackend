import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

// GET /api/transactions
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
      createdAt: -1,
    });
    return res.json(transactions);
  } catch (err) {
    return next(err);
  }
};

// POST /api/transactions
export const addTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, date } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ message: "Amount is required" });
    }
    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Type must be income or expense" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      amount: Number(amount),
      type,
      category,
      date: date ? new Date(date) : undefined,
    });

    return res.status(201).json(transaction);
  } catch (err) {
    return next(err);
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const existing = await Transaction.findOne({ _id: id, userId: req.user.id });
    if (!existing) return res.status(404).json({ message: "Transaction not found" });

    const { amount, type, category, date } = req.body;
    if (type && !["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Type must be income or expense" });
    }

    if (amount !== undefined) existing.amount = Number(amount);
    if (type !== undefined) existing.type = type;
    if (category !== undefined) existing.category = category;
    if (date !== undefined) existing.date = new Date(date);

    const updated = await existing.save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const deleted = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Transaction not found" });

    return res.json({ message: "Transaction deleted" });
  } catch (err) {
    return next(err);
  }
};

