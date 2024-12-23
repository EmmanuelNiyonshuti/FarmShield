import express from 'express';
import AuthController from '../controllers/userController.js';
import asyncHandler from "express-async-handler"
import authUser from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter
    .route('/register')
    .post(asyncHandler(AuthController.register))
authRouter
    .route('/login')
    .post(asyncHandler(AuthController.login))
authRouter
    .route('/getMe')
    .get(authUser, asyncHandler(AuthController.me))

export default authRouter;
