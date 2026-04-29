import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set in environment variables");
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  lastname: user.lastname || "",
  email: user.email,
  phone: user.phone || "",
  income: user.income ?? 0,
  gender: user.gender || "",
  profile_img: user.profile_img || "",
});

// POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    return res.status(201).json({
      token,
      user: toPublicUser(user),
    });
  } catch (err) {
    return next(err);
  }
};

// POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    return res.json({
      token,
      user: toPublicUser(user),
    });
  } catch (err) {
    return next(err);
  }
};
