import jwt from "jsonwebtoken";

// Protect routes with Bearer token
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set in environment variables");

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

