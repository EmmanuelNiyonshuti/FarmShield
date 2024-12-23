import express from 'express';
import connectDB from './config/db.js';
import router from './routes/index.js';
import logger from './middlewares/logger.js';
import customError from './utils/customError.js';
import gErrorHandler from './middlewares/errors.js';

const port = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);
app.all('*', (req, res, next) => {
    const err = new customError(`Can't find ${req.originalUrl} on the server`, 404)
    next(err);
})
app.use(gErrorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
