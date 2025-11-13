import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Leaf, Info, Droplets, Sprout, UtensilsCrossed, AlertTriangle } from 'lucide-react';

type Disease = {
  name: string;
  probability: string;
  description: string;
  treatment: string;
  prevention: string;
};

type Taxonomy = {
  [key: string]: string;
};

type CareInstructions = {
  watering: string;
  propagation: string;
  edibleParts: string;
};

type ResultType = {
  confidence: string;
  plantType: string;
  commonNames: string;
  scientificName: string;
  taxonomy: Taxonomy;
  description: string;
  careInstructions: CareInstructions;
  diseases: Disease[];
};

const plantDatabase: ResultType[] = [
  {
    confidence: "94%",
    plantType: "Tomato",
    commonNames: "Tomato, Love Apple",
    scientificName: "Solanum lycopersicum",
    taxonomy: {
      kingdom: "Plantae",
      phylum: "Tracheophyta",
      class: "Eudicots",
      order: "Solanales",
      family: "Solanaceae",
      genus: "Solanum",
      species: "S. lycopersicum"
    },
    description: "Tomato is a widely cultivated fruit crop known for its red, juicy berries. It is rich in vitamins and antioxidants.",
    careInstructions: {
      watering: "Water deeply and consistently, about 1-2 inches per week. Keep soil moist but not waterlogged.",
      propagation: "Grow from seeds indoors 6-8 weeks before last frost, or direct sow after frost danger passes.",
      edibleParts: "Fruit is edible raw or cooked. Stems and leaves are toxic."
    },
    diseases: [
      {
        name: "Early Blight",
        probability: "35%",
        description: "Fungal disease causing brown spots on lower leaves.",
        treatment: "Remove infected leaves, apply fungicide, improve air circulation.",
        prevention: "Avoid overhead watering, mulch soil, rotate crops."
      }
    ]
  }
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ResultType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
        reader.onloadend = () => {
          // FileReader.result can be string | ArrayBuffer | null — only accept string (data URL)
          if (typeof reader.result === 'string') {
            setSelectedImage(reader.result);
          } else {
            setSelectedImage(null);
          }
          setResults([]);
          setSelectedIndex(null);
        };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Use the 100-plant database
      setResults(plantDatabase);
      setSelectedIndex(0);
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResults([]);
    setSelectedIndex(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const current = selectedIndex !== null ? results[selectedIndex] : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-3">
              🌿 CropMind
            </h1>
            <p className="text-white text-lg font-medium drop-shadow-lg">
              From Farm to Garden - Identify Any Plant
            </p>
            <p className="text-green-100 text-sm mt-2 drop-shadow-md">
              Perfect for farmers, gardeners, and plant enthusiasts
            </p>
          </div>

          {/* Upload Section */}
          {!selectedImage && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6 border-2 border-green-300">
              <div className="border-2 border-dashed border-green-400 rounded-xl p-12 text-center hover:border-green-500 hover:bg-green-50/50 transition-all">
                <div className="flex justify-center mb-4">
                  <Camera className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Upload Plant Image
                </h3>
                <p className="text-gray-600 mb-6">
                  📸 Capture crops, flowers, trees, or any vegetation
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl cursor-pointer hover:from-green-700 hover:to-emerald-700 transition-all font-semibold text-lg shadow-lg transform hover:scale-105"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  Choose Plant Photo
                </label>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {selectedImage && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-6 border-2 border-green-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Leaf className="w-6 h-6 text-green-600 mr-2" />
                  Your Plant Sample
                </h3>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                  <X className="w-5 h-5 mr-2" />
                  Clear
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border-2 border-gray-200">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>
              <button
                onClick={handleIdentify}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Analyzing Plant...
                  </>
                ) : (
                  <>
                    <Leaf className="w-6 h-6 mr-3" />
                    Identify This Plant
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {current && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6 border-2 border-green-300">
              {/* Basic Info */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center">
                  <Info className="w-8 h-8 mr-3 text-green-600" />
                  Plant Analysis Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-xl border-2 border-green-300 shadow-md">
                    <p className="text-sm text-gray-700 mb-1 font-medium">Confidence Level</p>
                    <p className="text-3xl font-bold text-green-800">
                      {current?.confidence}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-5 rounded-xl border-2 border-emerald-300 shadow-md">
                    <p className="text-sm text-gray-700 mb-1 font-medium">Plant Species</p>
                    <p className="text-3xl font-bold text-emerald-800">
                      {current?.plantType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Names */}
              <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-5 rounded-xl border-2 border-lime-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Common Names
                </h3>
                <p className="text-gray-700 font-medium">{current?.commonNames}</p>
              </div>

              {/* Scientific Name */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Scientific Classification
                </h3>
                <p className="text-gray-700 italic text-xl font-semibold">{current?.scientificName}</p>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border-2 border-amber-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About This Plant
                </h3>
                <p className="text-gray-700 leading-relaxed">{current?.description}</p>
              </div>

              {/* Care Instructions */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Sprout className="w-6 h-6 mr-2 text-green-600" />
                  Farming & Care Guide
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-xl border-l-4 border-blue-600 shadow-md">
                    <div className="flex items-center mb-2">
                      <Droplets className="w-6 h-6 text-blue-700 mr-2" />
                      <p className="font-bold text-blue-900 text-lg">Watering Schedule</p>
                    </div>
                    <p className="text-gray-800">{current?.careInstructions.watering}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-xl border-l-4 border-purple-600 shadow-md">
                    <div className="flex items-center mb-2">
                      <Sprout className="w-6 h-6 text-purple-700 mr-2" />
                      <p className="font-bold text-purple-900 text-lg">Propagation Methods</p>
                    </div>
                    <p className="text-gray-800">{current?.careInstructions.propagation}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-5 rounded-xl border-l-4 border-orange-600 shadow-md">
                    <div className="flex items-center mb-2">
                      <UtensilsCrossed className="w-6 h-6 text-orange-700 mr-2" />
                      <p className="font-bold text-orange-900 text-lg">Edible Information</p>
                    </div>
                    <p className="text-gray-800">{current?.careInstructions.edibleParts}</p>
                  </div>
                </div>
              </div>

              {/* Taxonomy */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-5 rounded-xl border-2 border-teal-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Complete Taxonomy
                </h3>
                <div className="bg-white/70 p-4 rounded-lg space-y-2">
                  {current && Object.entries(current.taxonomy).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-teal-200 last:border-0">
                      <span className="text-gray-700 capitalize font-semibold">{key}:</span>
                      <span className="text-gray-900 font-bold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diseases */}
              {current && current.diseases.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="w-7 h-7 text-red-600 mr-2" />
                    Plant Health Assessment
                  </h3>
                  <div className="space-y-4">
                    {current.diseases.map((disease: Disease, index: number) => (
                      <div
                        key={index}
                        className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-red-900 text-xl">
                            {disease.name}
                          </h4>
                          <span className="text-sm bg-red-300 text-red-900 px-4 py-2 rounded-full font-bold">
                            {disease.probability}
                          </span>
                        </div>
                        <p className="text-gray-800 mb-4 font-medium">{disease.description}</p>
                        <div className="bg-white/80 p-4 rounded-lg mb-3 border border-red-200">
                          <p className="font-bold text-red-900 mb-2">
                            💊 Treatment Plan:
                          </p>
                          <p className="text-gray-800">{disease.treatment}</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-lg border border-red-200">
                          <p className="font-bold text-red-900 mb-2">
                            🛡️ Prevention Tips:
                          </p>
                          <p className="text-gray-800">{disease.prevention}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Footer */}
          {!selectedImage && !current && (
            <div className="text-center bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border-2 border-green-300">
              <p className="text-gray-700 font-semibold mb-2">🌱 Pro Tips for Best Results</p>
              <p className="text-gray-600 text-sm">✓ Use clear, well-lit photos</p>
              <p className="text-gray-600 text-sm">✓ Capture leaves, flowers, or distinct features</p>
              <p className="text-gray-600 text-sm">✓ Supported: JPEG, PNG, WEBP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;