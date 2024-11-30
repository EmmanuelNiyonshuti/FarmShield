import express from 'express';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import logger from './middlewares/logger.js';

const port = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
