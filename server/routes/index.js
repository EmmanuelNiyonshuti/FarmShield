import express from 'express';
import statusController from '../controllers/statusContoller.js';

const router = express.Router();

router.get("/", statusController);

export default router;
