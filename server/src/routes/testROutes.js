import express from "express";
import { submitTest,getUserTestHistory } from "../controllers/testController.js";

const router = express.Router();

router.post("/submit-test", submitTest);
router.get("/test-history/:userId", getUserTestHistory);

export default router;