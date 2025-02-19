import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import linksRouter from './routes/linksRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import passwordsRouter from './routes/passwordsRoutes.js';
dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(express.json());
    app.use(cors());
    console.log("Backend")
    app.use('/api/auth', authRouter);
    app.use('/api/links',linksRouter);
    app.use('/api/notes',notesRouter);
    app.use('/api/passwords',passwordsRouter);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
