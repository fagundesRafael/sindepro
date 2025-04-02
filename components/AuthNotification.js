// components/AuthNotification.js
'use client';

import { useEffect } from 'react';

// Aceita 'type' para estilização opcional (error, warning, success)
export default function AuthNotification({ isVisible, onClose, message, type = 'error' }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Fecha após 4 segundos

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Define a cor de fundo com base no tipo
  const bgColorClass = type === 'error' ? 'bg-red-600' // Vermelho para erro
                     : type === 'warning' ? 'bg-yellow-500' // Amarelo para aviso
                     : 'bg-green-600'; // Verde para sucesso (pode não usar aqui)

  return (
    // Posicionado no canto inferior esquerdo
    <div className={`fixed bottom-4 left-4 ${bgColorClass} text-white px-5 py-3 rounded-lg shadow-lg z-[100] flex items-center space-x-3 animate-fade-in-up`}>
      {/* Ícone de Aviso/Erro */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}