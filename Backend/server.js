import 'dotenv/config'; 
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { startTokenCleanupScheduler } from './services/TokenCleanupScheduler.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

startTokenCleanupScheduler();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.get('/health', (_,r)=>r.send('OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));