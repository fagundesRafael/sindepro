'use client';

export default function LoadingImage() {
  return (
    <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        <span className="mt-2 text-sm text-gray-500">Carregando imagem...</span>
      </div>
    </div>
  );
} 