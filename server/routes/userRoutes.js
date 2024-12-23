
import express from 'express';
import AuthController from '../controllers/userController.js';
import asyncHandler from "express-async-handler"
import authUser from '../middlewares/auth.js';
import pestReportRoutes from './pestReportRoutes.js';
import index from './index.js'


const router = express.Router();

//API status
router.use('/status', index);
// user authentication routes
router.post('/auth/register', asyncHandler(AuthController.register));
router.post('/auth/login', asyncHandler(AuthController.login));
router.get('/auth/getMe', authUser, asyncHandler(AuthController.me));

// pest outbreak reporting routes
router.use('/reports', pestReportRoutes);

export default router;
