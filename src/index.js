import express from 'express';
import "dotenv/config";
import cors from 'cors';
import job from "./lib/cron.js";

import authRoutes from './routes/authRoutes.js';
import reqDataRoutes from './routes/reqDataRoutes.js';
import { connectDB } from './lib/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, './uploads/pdfs');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/home", reqDataRoutes );
app.use('/files', express.static(path.join(__dirname, 'uploads/pdfs')));
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

