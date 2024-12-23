import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected on ${conn.connection.host}:${conn.connection.port}`);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;



