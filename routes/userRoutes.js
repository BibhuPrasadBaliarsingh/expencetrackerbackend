import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/me", getMe);
router.put("/me", updateMe);

export default router;

