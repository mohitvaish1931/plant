import dotenv from 'dotenv';

dotenv.config();

export const apiConfig = {
  plantApiKey: process.env.PLANT_API_KEY,
  plantApiUrl: process.env.PLANT_API_URL,
  apiTimeout: parseInt(process.env.API_TIMEOUT) || 30000,
  port: process.env.PORT || 5000,
};

export const validateConfig = () => {
  if (!apiConfig.plantApiKey || apiConfig.plantApiKey === 'your_api_key_here') {
    console.warn('⚠️  WARNING: PLANT_API_KEY is not configured in .env file');
  }

  if (!apiConfig.plantApiUrl || apiConfig.plantApiUrl.includes('example.com')) {
    console.warn('⚠️  WARNING: PLANT_API_URL is not configured in .env file');
  }
};
