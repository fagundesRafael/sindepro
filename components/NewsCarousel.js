// components/NewsCarousel.js
"use client"; // Necessário porque usa useState, useEffect, event handlers

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Recebe os slides iniciais como prop
export default function NewsCarousel({ initialSlides = [] }) { // Define valor padrão
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    // Usa os slides recebidos via props
    const [slides, setSlides] = useState(initialSlides);

    // REMOVIDO: useEffect para buscar dados (agora vem por props)

    // Efeito para resetar o estado se os slides iniciais mudarem (opcional, mas bom)
    useEffect(() => {
        setSlides(initialSlides);
        setCurrentSlide(0); // Reseta para o primeiro slide ao receber novos dados
    }, [initialSlides]);


    // Função para avançar para o próximo slide
    const nextSlide = () => {
        // Só avança se houver mais de um slide
        if (!isTransitioning && slides.length > 1) {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }
    };

    // Função para voltar para o slide anterior
    const prevSlide = () => {
         // Só volta se houver mais de um slide
        if (!isTransitioning && slides.length > 1) {
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }
    };

    // Função para ir para um slide específico
    const goToSlide = (index) => {
        if (!isTransitioning && index !== currentSlide && slides.length > 1) {
            setCurrentSlide(index);
        }
    };

    // Efeito para avançar automaticamente os slides
    useEffect(() => {
         // Só ativa o intervalo se houver mais de um slide
        if (slides.length > 1) {
            const interval = setInterval(() => {
                if (!isHovered) {
                    nextSlide();
                }
            }, 5000); // Intervalo de 5 segundos

            return () => clearInterval(interval);
        }
         // Adiciona slides.length como dependência para reiniciar o intervalo se o número de slides mudar
    }, [isHovered, slides.length]);


    // REMOVIDO: handleClick (o Link já faz a navegação)


    // Ajuste na altura do container principal do carrossel se necessário
    // A altura h-80 estava aqui, mas o pai (Home) define h-[calc(2*152px+1rem)]
    // Vamos usar h-full para preencher o container pai
    return (
        <div className="relative h-full mx-auto w-full overflow-hidden rounded-lg">
            {slides.length > 0 ? (
                slides.map((slide, index) => (
                    <div
                        key={slide.id || `slide-${index}`} // Adiciona fallback key
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Link href={`/noticias/${slide.id}`} legacyBehavior>
                            {/* Usar tag <a> dentro de Link se precisar de event handlers como onClick ou passar refs */}
                            <a className="block w-full h-full relative">
                                {/* Imagem de fundo */}
                                <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'
                                    }`}>
                                    <Image
                                        src={slide.imagem}
                                        alt={slide.titulo}
                                        fill
                                        sizes="(max-width: 1024px) 60vw, 50vw" // Ajustar sizes para o contexto do carrossel
                                        style={{ objectFit: "cover" }}
                                        priority={index === 0} // Prioriza a primeira imagem
                                        // Removido: unoptimized={true}
                                        // placeholder="blur" // Descomente se tiver blurDataURL
                                    />
                                </div>

                                {/* Overlay vermelho com texto */}
                                {/* Movido para dentro do Link/<a> */}
                                <div
                                    className="absolute inset-y-0 left-0 w-1/2 flex items-center pointer-events-none" // pointer-events-none para não interferir no Link
                                    style={{
                                        backgroundColor: `rgba(185, 28, 28, ${isHovered ? 0.9 : 0.75})`, // B91C1C = red-700
                                        transition: 'background-color 0.3s ease-in-out',
                                    }}
                                >
                                    <div className="p-6 text-white">
                                        <h2 className="text-xl md:text-2xl font-bold mb-3 line-clamp-3">{slide.titulo}</h2>
                                        <p className="mb-4 text-sm line-clamp-2 md:line-clamp-3">
                                             {/* Usar slide.texto que foi mapeado */}
                                            {slide.texto}
                                        </p>
                                        <p className="text-xs mt-auto">
                                            {slide.data}, {slide.hora} | Autor: <em>{slide.autor}</em>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))
            ) : (
                 // Estado de Carregamento/Sem Slides (pode ser melhorado)
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <Image
                        src="/general/no-image.jpg"
                        alt="Sem notícias para exibir"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white text-xl">Nenhuma notícia no carrossel</p>
                    </div>
                </div>
            )}

             {/* Controles de navegação (só mostra se houver mais de 1 slide) */}
             {slides.length > 1 && (
                <>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                        {slides.map((_, index) => (
                            <button
                                key={`dot-${index}`}
                                onClick={() => goToSlide(index)}
                                className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-700 w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-100'
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 z-20"
                        onClick={nextSlide}
                        aria-label="Próximo slide"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
             )}
        </div>
    );
}