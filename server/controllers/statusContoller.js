import mongoose from "mongoose";

const statusController = (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
        status: 'ok',
        message: 'API is running',
        database: {
            status: dbStatus,
            host: mongoose.connection.host || 'N/A',
            port: mongoose.connection.port || 'N/A',
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    }) 
};

export default statusController;
