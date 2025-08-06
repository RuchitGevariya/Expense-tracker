import express from "express";
const router = express.Router();
import { Check } from "../Middleware/Auth.js";
import {
  HandleAddexpense,
  GetFilterData,
  HandleExpenseUpdate,
  HandleExpenseDelete,
  HandleYearTotal,
  HandleMonthTotal,
  HandleWeeklyTotal,
  HandleCategory,
  GetPdf,
} from "../Controller/AddExpenseController.js";

router.post("/expense", Check, HandleAddexpense);

router.get("/expense", Check, GetFilterData);
router.put("/expense/:id", Check, HandleExpenseUpdate);

router.delete("/expense/:id", HandleExpenseDelete);

router.get("/expense/year/total", Check, HandleYearTotal);
router.get("/expense/month/total", Check, HandleMonthTotal);

router.get("/expense/weekly/total", Check, HandleWeeklyTotal);

router.get("/expense/category",Check,HandleCategory)
router.get("/expense/pdf", Check, GetPdf);
export default router;
