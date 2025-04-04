//components/NewsCarousel.js
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Buscar configurações
        const configResponse = await fetch('/api/configs');
        const configData = await configResponse.json();
        
        // Extrair IDs S1, S2, S3
        const slideIds = ['S1', 'S2', 'S3'].map(key => configData[key]).filter(Boolean);
        
        // Buscar notícias correspondentes
        const newsPromises = slideIds.map(id =>
          fetch(`/api/news/${id}`)
            .then(res => res.json())
            .catch(() => null)
        );

        const newsResults = await Promise.all(newsPromises);
        
        // Formatar slides
        const validSlides = newsResults
          .filter(item => item && item.titulo)
          .map(item => ({
            id: item._id,
            titulo: item.titulo,
            texto: item.descricao,
            imagem: item.imagem || '/general/no-image.jpg',
            data: new Date(item.data).toLocaleDateString('pt-BR'),
            hora: new Date(item.data).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            autor: item.autor
          }));

        setSlides(validSlides);
      } catch (error) {
        console.error('Erro ao buscar slides:', error);
        setSlides([]);
      }
    };

    fetchSlides();
  }, []);

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    if (!isTransitioning) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  // Função para voltar para o slide anterior
  const prevSlide = () => {
    if (!isTransitioning) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  // Função para ir para um slide específico
  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setCurrentSlide(index);
    }
  };

  // Efeito para avançar automaticamente os slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Função para lidar com o clique na notícia
  const handleClick = () => {
    setIsTransitioning(true);
    setIsClicked(true); // Definir como clicado para retornar a escala da imagem
    
    // Simular navegação após a transição
    setTimeout(() => {
      // Aqui você pode adicionar a navegação para a página da notícia
      console.log(`Navegando para a notícia ${slides[currentSlide].id}`);
      setIsTransitioning(false);
      setIsClicked(false); // Resetar o estado de clique após a transição
    }, 500);
  };

  return (
    <div className="relative h-80 mx-auto w-full overflow-hidden rounded-lg">
      {slides.length > 0 ? (
        slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href={`/noticias/${slide.id}`}>
              {/* Imagem de fundo */}
              <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                isHovered && !isClicked ? 'scale-105' : 'scale-100'
              }`}>
                <Image 
                  src={slide.imagem} 
                  alt={slide.titulo} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 75vw"
                  style={{objectFit: "cover"}}
                  priority={index === 0}
                  unoptimized={true}
                />
              </div>
              
              {/* Overlay vermelho com texto - opacidade 75% normal, 90% no hover */}
              <div 
                className="absolute inset-y-0 left-0 w-1/2 flex items-center"
                style={{
                  backgroundColor: `rgba(185, 28, 28, ${isHovered ? 0.9 : 0.75})`, // Vermelho com opacidade variável
                  transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, background-color 0.3s ease-in-out',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateX(50%)' : 'translateX(0)' // Mover apenas até a metade da tela
                }}
              >
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-3">{slide.titulo}</h2>
                  <p className="mb-4 text-sm">
                    {slide.texto.length > 60 
                      ? `${slide.texto.substring(0, 60)}...` 
                      : slide.texto
                    }
                  </p>
                  <p className="text-xs mt-auto">
                    {slide.data}, {slide.hora} | Autor: <em>{slide.autor}</em>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <Image
            src="/general/no-image.jpg"
            alt="Sem notícias"
            fill
            style={{objectFit: "cover"}}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-xl">Carregando notícias...</p>
          </div>
        </div>
      )}

      {/* Controles de navegação */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-red-700 w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-100'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação lateral */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}