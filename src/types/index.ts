export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | PlantAnalysisResult;
  timestamp: Date;
  imageUrl?: string;
}

export interface PlantAnalysisResult {
  plantType: string;
  scientificName: string;
  disease: string;
  healthStatus: string;
  confidence: number;
  recommendations: string[];
}

export interface ApiResponse {
  success: boolean;
  data?: PlantAnalysisResult;
  error?: string;
}
