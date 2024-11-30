
import express from 'express';
import AuthController from '../controllers/authController.js';
import asyncHandler from "express-async-handler"

const router = express.Router();

router.post('/auth/register', asyncHandler(AuthController.register));
router.post('/auth/login', asyncHandler(AuthController.login));
router.get('/auth/me', asyncHandler(AuthController.me));

export default router;
