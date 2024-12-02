import mongoose from "mongoose";
import User from "./User";

const pestReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pestName: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Low',
    },
    imageUrl: {
        type: String,
        required: false,
    },
    reportDate: {
        type: Date,
        default: Date.now,
    }

}, {
    timestamps: true,
})

const pestReport = mongoose.model('PestReport', pestReportSchema);

export default pestReport;
