//components/NewsCarousel.js
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Dados simulados para o carrossel com imagens do Pexels
  const slides = [
    {
      id: 1,
      titulo: "Sindepro realiza assembleia para discutir melhorias na carreira",
      texto: "Encontro contou com a presença de diversos delegados e autoridades do estado para debater temas importantes para a categoria e definir estratégias para os próximos meses.",
      imagem: "https://images.pexels.com/photos/30267350/pexels-photo-30267350/free-photo-of-charmosa-casa-breta-com-bicicleta-em-ouessant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      data: "15/06/2023",
      hora: "14:30",
      autor: "Maria Silva"
    },
    {
      id: 2,
      titulo: "Curso de capacitação para delegados será realizado em agosto",
      texto: "Inscrições já estão abertas para associados do Sindepro. O curso abordará temas relevantes para a atuação profissional e contará com palestrantes renomados.",
      imagem: "https://images.pexels.com/photos/16648616/pexels-photo-16648616/free-photo-of-pessoas-transporte-publico-estacao-plataforma.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      data: "20/07/2023",
      hora: "09:45",
      autor: "João Santos"
    },
    {
      id: 3,
      titulo: "Sindepro participa de reunião com secretário de segurança pública",
      texto: "Foram discutidas pautas importantes para a categoria, incluindo melhorias nas condições de trabalho e valorização da carreira de delegado de polícia.",
      imagem: "https://images.pexels.com/photos/30783373/pexels-photo-30783373/free-photo-of-homem-preparando-cafe-em-um-jardim-verdejante.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      data: "05/08/2023",
      hora: "16:15",
      autor: "Carlos Oliveira"
    }
  ];

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
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
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
              <p className="mb-4 text-sm">{slide.texto}</p>
              <p className="text-xs mt-auto">
                {slide.data}, {slide.hora} | Autor: <em>{slide.autor}</em>
              </p>
            </div>
          </div>
        </div>
      ))}

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