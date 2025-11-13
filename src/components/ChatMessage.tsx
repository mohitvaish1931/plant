import { Message, PlantAnalysisResult } from '../types';
import { Leaf, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  

  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-4 animate-fadeIn">
        <div className="max-w-[80%] md:max-w-[60%]">
          {message.imageUrl && (
            <div className="mb-2">
              <img
                src={message.imageUrl}
                alt="Uploaded plant"
                className="rounded-lg shadow-md max-h-64 w-auto ml-auto"
              />
            </div>
          )}
          <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
            <p className="text-sm">{message.content as string}</p>
          </div>
        </div>
      </div>
    );
  }

  const result = message.content as PlantAnalysisResult;

  return (
    <div className="flex justify-start mb-4 animate-fadeIn">
      <div className="max-w-[80%] md:max-w-[60%]">
        <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-md border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Analysis Complete</h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Plant Type</p>
              <p className="text-base font-medium text-gray-800">{result.plantType}</p>
              <p className="text-xs text-gray-500 italic">{result.scientificName}</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Health Status</p>
              <div className="flex items-center gap-2">
                {result.healthStatus === 'Healthy' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{result.healthStatus}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600">{result.healthStatus}</span>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Detected Condition</p>
              <p className="text-sm text-gray-700">{result.disease}</p>
            </div>

            {result.confidence > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Recommendations</p>
              <ul className="space-y-1.5">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span className="flex-1">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};
