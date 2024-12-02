import express from 'express';
import asyncHandler from "express-async-handler"
import PestReportsController from "../controllers/pestReportController";

const router = express.Router();

router.post('/reports', authUser, asyncHandler(PestReportsController.createReport));
