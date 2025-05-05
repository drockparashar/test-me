import express from "express";
import {
  submitTest,
  getUserTestHistory,
  getTestResult,
} from "../controllers/testController.js";

const router = express.Router();

router.post("/submit-test", submitTest);
router.get("/test-history/:userId", getUserTestHistory);
router.get("/getTestResult/:_id", getTestResult);

export default router;
