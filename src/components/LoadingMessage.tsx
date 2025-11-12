import { Leaf } from 'lucide-react';

export const LoadingMessage = () => {
  return (
    <div className="flex justify-start mb-4 animate-fadeIn">
      <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-md border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Leaf className="w-6 h-6 text-emerald-600 animate-pulse" />
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-gray-600">Analyzing plant health...</span>
        </div>
      </div>
    </div>
  );
};
