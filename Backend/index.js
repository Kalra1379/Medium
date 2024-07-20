import express from "express";
import cors from 'cors';
import authRoutes from "./Routers/authRoutes.js";
import paperRoutes from './Routers/paperRoutes.js';
import { connectDb } from "./Services/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies for POST requests
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/paper', paperRoutes);

// Connect to MongoDB
connectDb()
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Your Server is Ready at PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });