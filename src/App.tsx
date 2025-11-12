import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { LoadingMessage } from './components/LoadingMessage';
import { ImageUpload } from './components/ImageUpload';
import { EmptyState } from './components/EmptyState';
import { analyzePlantImage } from './services/api.service';
import { Message } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl) return;

    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: 'Analyzing this plant image...',
      timestamp: new Date(),
      imageUrl: previewUrl,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await analyzePlantImage(selectedFile);

      if (response.success && response.data) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.data,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(response.error || 'Analysis failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);

      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: {
          plantType: 'Error',
          scientificName: 'N/A',
          disease: errorMessage,
          healthStatus: 'Unknown',
          confidence: 0,
          recommendations: [
            'Please try again with a clearer image',
            'Ensure your backend server is running',
            'Check that API credentials are configured correctly',
          ],
        },
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 flex flex-col">
      <Header />

      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 && !isLoading ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingMessage />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <ImageUpload onImageSelect={handleImageSelect} disabled={isLoading} />

              {previewUrl && (
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 shadow-lg transition-all duration-200 hover:shadow-xl font-semibold"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Plant Health'}
                </button>
              )}
            </div>

            <p className="text-xs text-center text-gray-500 mt-3">
              Powered by AI • Instant plant health analysis
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
