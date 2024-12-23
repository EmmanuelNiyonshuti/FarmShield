import express from 'express';
import apiStatusController from '../controllers/statusContoller.js';
import pestReportRoutes from './pestReportRoutes.js';
import authRouter from './userRoutes.js';

const router = express.Router();

router.get("/status", apiStatusController);

router.use('/auth', authRouter);

router.use('/reports', pestReportRoutes);

export default router;
