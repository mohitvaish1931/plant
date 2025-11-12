import express from 'express';
import { analyzePlant } from '../controllers/plant.controller.js';
import { upload } from '../config/multer.config.js';

const router = express.Router();

router.post('/analyze', upload.single('image'), analyzePlant);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Plant Health API is running' });
});

export default router;
