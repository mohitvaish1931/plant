import express from 'express';
import cors from 'cors';
import { apiConfig, validateConfig } from './config/api.config.js';
import plantRoutes from './routes/plant.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

validateConfig();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/plant', plantRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Plant Health Identification API Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = apiConfig.port;

app.listen(PORT, () => {
  console.log(`\n🌱 Plant Health API Server running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/plant/analyze`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
