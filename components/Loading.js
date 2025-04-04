"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Simula carregamento irregular para parecer mais natural
        const increment = Math.random() * 10;
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center h-[80vh] w-full">
      <div className="w-full max-w-md flex flex-col items-center px-4">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/logos/logo-sindepro-maior.png"
            alt="Logo Sindepro"
            width={200}
            height={160}
            priority
          />
        </div>

        {/* Texto de carregamento */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Carregando</h2>
          <p className="text-gray-600">Aguarde enquanto preparamos tudo para você</p>
        </div>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-800 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Pontos de carregamento animados */}
        <div className="flex space-x-2 justify-center">
          <div className="animate-bounce delay-100 w-3 h-3 bg-red-700 rounded-full"></div>
          <div className="animate-bounce delay-300 w-3 h-3 bg-red-700 rounded-full"></div>
          <div className="animate-bounce delay-500 w-3 h-3 bg-red-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
} 