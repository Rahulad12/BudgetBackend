import express from 'express';
import connectDB from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'server is running...',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


