'use client';

import { useState, useRef } from 'react';
import { IKUpload, ImageKitProvider } from 'imagekitio-next';
import LoadingImage from './LoadingImage';

export default function ImageUploader({ onImageUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const uploadRef = useRef(null);
  
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

  // Tamanho máximo de 200KB em bytes
  const MAX_FILE_SIZE = 200 * 1024;

  const validateFile = (file) => {
    setError('');

    // Verifica o tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      setError(`O arquivo é muito grande. O tamanho máximo permitido é 200KB. Tamanho atual: ${(file.size / 1024).toFixed(2)}KB`);
      return false;
    }

    // Verifica o tipo do arquivo
    if (!file.type.startsWith('image/')) {
      setError('Apenas arquivos de imagem são permitidos');
      return false;
    }

    return true;
  };

  const onError = (err) => {
    console.error('Erro no upload:', err);
    setError('Ocorreu um erro ao fazer upload da imagem');
    setIsUploading(false);
  };

  const onSuccess = (res) => {
    setIsUploading(false);
    setError('');
    if (res.url) {
      onImageUpload(res.url);
    }
  };

  const authenticator = async () => {
    try {
      const response = await fetch('/api/imagekit-auth');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha na autenticação: ${errorText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro de autenticação:', err);
      setError('Erro de autenticação ao tentar fazer upload');
      throw err;
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificação prévia do tamanho do arquivo
    const MAX_FILE_SIZE = 200 * 1024; // 200KB
    if (file.size > MAX_FILE_SIZE) {
      setError('O tamanho da imagem excede o limite de 200KB');
      return;
    }

    setError('');
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao fazer upload da imagem');
      }

      onImageUpload(data.url);
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message || 'Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div className="flex flex-col items-center">
          {isUploading ? (
            <LoadingImage />
          ) : (
            <>
              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Carregar Imagem
              </button>
              <span className="text-sm text-gray-500 mt-2">
                Formatos aceitos: JPG, PNG (máx. 200KB)
              </span>
              {error && (
                <div className="text-red-600 text-sm mt-2 text-center">
                  {error}
                </div>
              )}
            </>
          )}
          <IKUpload
            ref={uploadRef}
            fileName="news-image"
            onError={onError}
            onSuccess={onSuccess}
            onUploadStart={() => {
              setIsUploading(true);
              setError('');
            }}
            style={{ display: 'none' }}
            validateFile={validateFile}
            folder="/noticias"
          />
        </div>
      </ImageKitProvider>
    </div>
  );
} 