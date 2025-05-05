import express from 'express';
import { getUserData } from '../controllers/userController.js';

const router = express.Router();
router.get('/getUserData/:id', getUserData);

export default router;