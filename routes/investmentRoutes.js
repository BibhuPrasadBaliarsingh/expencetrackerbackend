import express from "express";
import {
  addInvestment,
  deleteInvestment,
  getInvestments,
  updateInvestment,
} from "../controllers/investmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getInvestments);
router.post("/", addInvestment);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

export default router;

