import { apiConfig } from '../config/api.config.js';

export const analyzePlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString('base64');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.apiTimeout);

    try {
      const response = await fetch(apiConfig.plantApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.plantApiKey}`,
        },
        body: JSON.stringify({
          images: [base64Image],
          modifiers: ['health', 'disease'],
          plant_details: ['common_name', 'scientific_name', 'structured_name'],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      const formattedResponse = formatPlantResponse(data);

      return res.json({
        success: true,
        data: formattedResponse,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout: Plant API took too long to respond');
      }

      throw fetchError;
    }
  } catch (error) {
    console.error('Plant analysis error:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze plant image',
    });
  }
};

const formatPlantResponse = (apiResponse) => {
  return {
    plantType: apiResponse.suggestions?.[0]?.plant_name || 'Unknown Plant',
    scientificName: apiResponse.suggestions?.[0]?.plant_details?.scientific_name || 'N/A',
    disease: apiResponse.health_assessment?.diseases?.[0]?.name || 'No disease detected',
    healthStatus: apiResponse.health_assessment?.is_healthy ? 'Healthy' : 'Unhealthy',
    confidence: apiResponse.suggestions?.[0]?.probability || 0,
    recommendations: formatRecommendations(apiResponse.health_assessment),
    rawData: apiResponse,
  };
};

const formatRecommendations = (healthAssessment) => {
  if (!healthAssessment || healthAssessment.is_healthy) {
    return [
      'Your plant appears healthy!',
      'Continue regular watering schedule',
      'Ensure adequate sunlight exposure',
      'Monitor for any changes in appearance',
    ];
  }

  const disease = healthAssessment.diseases?.[0];
  const recommendations = [];

  if (disease) {
    if (disease.treatment) {
      recommendations.push(`Treatment: ${disease.treatment}`);
    }

    if (disease.common_names && disease.common_names.length > 0) {
      recommendations.push(`Also known as: ${disease.common_names.join(', ')}`);
    }

    if (disease.prevention) {
      recommendations.push(`Prevention: ${disease.prevention}`);
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Consult with a local plant expert for specific treatment',
      'Remove affected leaves if necessary',
      'Ensure proper drainage and air circulation',
      'Consider using organic fungicides'
    );
  }

  return recommendations;
};
