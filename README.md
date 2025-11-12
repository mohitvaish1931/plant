# Plant Health Identification AI System

A modern, production-ready MERN stack application for plant disease detection using AI. Features a ChatGPT-style interface where users can upload plant leaf images and receive instant health analysis with treatment recommendations.

## Features

- **Chat-Style Interface**: Modern, responsive UI inspired by ChatGPT
- **Image Upload**: Support for camera capture or file upload
- **Real-time Analysis**: Instant plant health diagnosis via external API
- **Detailed Results**: Plant type, disease detection, confidence score, and care recommendations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error management and user feedback
- **Production Ready**: Enterprise-level code architecture with modular structure

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **Multer** for file upload handling
- **CORS** enabled for cross-origin requests
- **dotenv** for environment configuration

## Project Structure

```
project/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── api.config.js  # API configuration
│   │   │   └── multer.config.js
│   │   ├── controllers/       # Route controllers
│   │   │   └── plant.controller.js
│   │   ├── middleware/        # Express middleware
│   │   │   └── error.middleware.js
│   │   ├── routes/            # API routes
│   │   │   └── plant.routes.js
│   │   └── server.js          # Main server file
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   └── package.json
│
└── src/                       # React frontend
    ├── components/            # React components
    │   ├── ChatMessage.tsx    # Message bubble component
    │   ├── EmptyState.tsx     # Initial welcome screen
    │   ├── Header.tsx         # App header
    │   ├── ImageUpload.tsx    # Image upload component
    │   └── LoadingMessage.tsx # Loading animation
    ├── services/              # API services
    │   └── api.service.ts     # Backend API integration
    ├── types/                 # TypeScript types
    │   └── index.ts
    ├── App.tsx                # Main app component
    ├── main.tsx               # React entry point
    └── index.css              # Global styles
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `backend/.env` file
   - **PASTE YOUR PLANT HEALTH API KEY** in the `PLANT_API_KEY` field
   - **PASTE YOUR PLANT HEALTH API URL** in the `PLANT_API_URL` field

```env
PORT=5000

# PASTE YOUR PLANT HEALTH API KEY BELOW
PLANT_API_KEY=your_actual_api_key_here

# PASTE YOUR PLANT HEALTH API URL BELOW
# Example: https://api.plantid.com/v1/identify
# Or: https://plant.id/api/v3/health_assessment
PLANT_API_URL=https://your-api-url.com/endpoint

API_TIMEOUT=30000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Configuration Guide

### Where to Get Plant Health API

You can use any of these popular plant identification APIs:

1. **Plant.id** (Recommended)
   - URL: https://plant.id
   - Endpoint: `https://api.plant.id/v3/health_assessment`
   - Features: Disease detection, health assessment, treatment recommendations

2. **PlantNet**
   - URL: https://plantnet.org
   - Good for plant identification

3. **Perenual**
   - URL: https://perenual.com
   - Comprehensive plant care database

### API Configuration Steps

1. Sign up for your chosen plant health API service
2. Obtain your API key from the dashboard
3. Get the API endpoint URL
4. Update `backend/.env` with your credentials
5. Restart the backend server

### API Request Format

The backend sends requests in this format:

```javascript
{
  "images": ["base64_encoded_image"],
  "modifiers": ["health", "disease"],
  "plant_details": ["common_name", "scientific_name", "structured_name"]
}
```

Headers:
```javascript
{
  "Content-Type": "application/json",
  "Api-Key": "YOUR_API_KEY",
  "Authorization": "Bearer YOUR_API_KEY"
}
```

## Usage

1. Open the application in your browser
2. Click the "Scan Plant" button
3. Upload or capture a plant leaf image
4. Preview the image
5. Click "Analyze Plant Health"
6. Wait for AI analysis (loading animation will display)
7. View detailed results including:
   - Plant type and scientific name
   - Health status
   - Disease detection
   - Confidence score
   - Treatment recommendations

## API Endpoints

### Backend API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/plant/health` | GET | Plant service health check |
| `/api/plant/analyze` | POST | Analyze plant image (multipart/form-data) |

### Request Example

```bash
curl -X POST http://localhost:5000/api/plant/analyze \
  -F "image=@/path/to/plant-image.jpg"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "plantType": "Tomato Plant",
    "scientificName": "Solanum lycopersicum",
    "disease": "Early Blight",
    "healthStatus": "Unhealthy",
    "confidence": 0.89,
    "recommendations": [
      "Remove affected leaves immediately",
      "Apply copper-based fungicide",
      "Improve air circulation around plants",
      "Water at the base, avoid wetting leaves"
    ]
  }
}
```

## Build for Production

### Frontend Build
```bash
npm run build
```

### Backend Production
```bash
cd backend
npm start
```

## Features in Detail

### Image Upload Component
- Drag & drop support
- File type validation (JPEG, PNG, WebP)
- 10MB file size limit
- Real-time preview
- Clear/remove functionality

### Analysis Display
- Animated message bubbles
- Plant identification with scientific names
- Health status indicators
- Visual confidence meter
- Actionable recommendations
- Timestamp for each analysis

### Error Handling
- Network error recovery
- API timeout handling
- Invalid file type detection
- User-friendly error messages
- Graceful degradation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized image processing
- Lazy loading for components
- Efficient state management
- Minimal re-renders
- Fast build times with Vite

## Security Features

- File type validation
- File size limits
- CORS configuration
- Environment variable protection
- Input sanitization
- Error message sanitization

## Troubleshooting

### Backend Issues

**Error: "PLANT_API_KEY is not configured"**
- Ensure you've added your API key to `backend/.env`
- Restart the backend server after updating

**Error: "Request timeout"**
- Increase `API_TIMEOUT` in `backend/.env`
- Check your internet connection
- Verify the API endpoint is accessible

### Frontend Issues

**Error: "Failed to fetch"**
- Ensure backend server is running on port 5000
- Check CORS configuration
- Verify `API_BASE_URL` in `src/services/api.service.ts`

**Images not uploading**
- Check file size (max 10MB)
- Verify file format (JPEG, PNG, WebP only)
- Ensure sufficient browser storage

## Development Notes

- No database required (as per requirements)
- No authentication system (as per requirements)
- Modular, enterprise-style code structure
- Clean separation of concerns
- TypeScript for type safety
- Comprehensive error handling
- Production-ready code quality

## Future Enhancements

- Historical analysis storage
- Multiple image upload
- Plant care reminders
- Expert consultation integration
- Multilingual support
- Offline mode with caching

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please check:
1. API configuration in `.env`
2. Backend server is running
3. Frontend is connecting to correct backend URL
4. Browser console for error messages
