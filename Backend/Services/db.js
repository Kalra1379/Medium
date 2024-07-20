import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};