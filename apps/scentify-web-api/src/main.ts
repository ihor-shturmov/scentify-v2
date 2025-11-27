import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import perfumeRoutes from './routes/perfumes.routes';
import { connectDB } from './database/index.js';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Scentify Web API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Scentify API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Perfume routes
app.use('/api/perfumes', perfumeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


// Error handler
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Connect to database (env vars are already loaded)
    await connectDB();

    // Start server
    app.listen(port, host, () => {
      console.log(`🚀 Server ready at http://${host}:${port}`);
      console.log(`📊 Health check: http://${host}:${port}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
