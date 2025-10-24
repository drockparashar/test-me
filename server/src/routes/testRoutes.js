import express from "express";
import {
  submitTest,
  getUserTestHistory,
  getTestResult,
  getUserTests,
} from "../controllers/testController.js";

const router = express.Router();

router.post("/submit-test", submitTest);
router.get("/test-history/:userId", getUserTestHistory);
router.get("/getTestResult/:testId", getTestResult);
router.get("/user-tests/:userId", getUserTests); // Debug route

export default router;
