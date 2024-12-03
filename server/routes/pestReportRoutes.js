import express from 'express';
import asyncHandler from "express-async-handler"
import PestReportsController from "../controllers/pestReportController.js";
import authUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authUser, asyncHandler(PestReportsController.createReport));



export default router;
