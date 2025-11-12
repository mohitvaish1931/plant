import { Leaf, Camera, Sparkles } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-emerald-200 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="relative p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl">
          <Leaf className="w-16 h-16 text-emerald-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Welcome to PlantCare AI
      </h2>

      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        Upload a photo of your plant's leaf to get instant AI-powered health analysis,
        disease detection, and personalized care recommendations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <Camera className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">Upload Image</h3>
          <p className="text-xs text-gray-500">Take or select a clear photo</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">AI Analysis</h3>
          <p className="text-xs text-gray-500">Get instant diagnosis</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">Care Tips</h3>
          <p className="text-xs text-gray-500">Receive expert recommendations</p>
        </div>
      </div>
    </div>
  );
};
