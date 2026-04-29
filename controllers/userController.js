import User from "../models/User.js";

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

// GET /api/users/me (protected)
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user: toPublicUser(user) });
  } catch (err) {
    return next(err);
  }
};

// PUT /api/users/me (protected)
export const updateMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, lastname, phone, income, gender, profile_img, password } = req.body || {};

    if (name !== undefined) user.name = String(name);
    if (lastname !== undefined) user.lastname = String(lastname);
    if (phone !== undefined) user.phone = String(phone);
    if (income !== undefined) user.income = Number(income) || 0;
    if (gender !== undefined) user.gender = String(gender);
    if (profile_img !== undefined) user.profile_img = String(profile_img);

    if (password !== undefined && String(password).length > 0) {
      if (String(password).length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }
      user.password = String(password);
    }

    const updated = await user.save();
    return res.json({ user: toPublicUser(updated) });
  } catch (err) {
    return next(err);
  }
};

