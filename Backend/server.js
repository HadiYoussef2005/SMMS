import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { startTokenCleanupScheduler } from './services/TokenCleanupScheduler.js';

dotenv.config();

const app = express();

startTokenCleanupScheduler();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));