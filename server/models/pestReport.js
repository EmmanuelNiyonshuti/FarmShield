import mongoose from "mongoose";

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
        type: { 
            type: String, 
            enum: ['Point'], 
            required: true 
        },
        coordinates: { 
            type: [Number],
            required: true 
        }
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
    images: [{
        type: String,
        required: false,
    }],
    reportDate: {
        type: Date,
        default: Date.now,
    }

}, {
    timestamps: true,
})

pestReportSchema.index({ location: '2dsphere'});

const pestReport = mongoose.model('PestReport', pestReportSchema);

export default pestReport;
