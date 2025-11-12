import { Leaf, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">PlantCare AI</h1>
              <p className="text-emerald-100 text-sm">Smart Plant Health Diagnosis</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium">AI Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};
