//components/LoadingOverlay.js
'use client';

export default function LoadingOverlay() {
  return (
    <>
      {/* Overlay com fundo transparente */}
      <div className="fixed inset-0 z-50">
        {/* Container flexível que centraliza o conteúdo */}
        <div className="w-full h-full flex items-center justify-center backdrop-blur-xs">
          {/* Card do loading */}
          <div className="bg-white/10 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4 backdrop-blur-xs">
            <img
              src="/logos/logo-sindepro-maior.png"
              alt="Logo SINDEPRO"
              className="w-32 h-auto"
            />
            <h1 className="text-4xl font-bold text-red-700">SINDEPRO</h1>
            
            {/* Barra de Loading */}
            <div className="w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden">
              <div className="h-full bg-red-700 animate-loading"></div>
            </div>
            
            <p className="text-gray-600 mt-4">Aguarde...</p>
          </div>
        </div>
      </div>
    </>
  );
} 