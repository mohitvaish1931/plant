import { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);
      onImageSelect(file, previewUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleClearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      {preview ? (
        <div className="relative bg-white rounded-2xl p-4 shadow-md border border-gray-200">
          <button
            onClick={handleClearPreview}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </button>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain rounded-lg"
          />
          <p className="text-xs text-gray-500 text-center mt-2">Image ready to analyze</p>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          disabled={disabled}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <div className="p-2 bg-white/20 rounded-full">
            <Camera className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-base">Scan Plant</p>
            <p className="text-xs text-emerald-100">Upload or capture an image</p>
          </div>
          <Upload className="w-5 h-5 ml-auto" />
        </button>
      )}
    </div>
  );
};
