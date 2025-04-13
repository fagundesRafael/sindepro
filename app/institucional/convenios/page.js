// app/institucional/convenios/page.js
"use client";

import { useState, useEffect } from 'react'; // Import hooks
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import OfflineNotice from '@/components/OfflineNotice';

export default function Convenios() {
    // Estado para armazenar as notícias da categoria "Convênios"
    const [conveniosNoticias, setConveniosNoticias] = useState([]);
    // Estado para controle de carregamento
    const [loading, setLoading] = useState(true);
    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const noticiasPerPage = 12; // Quantidade de convênios por página

    // Hook para buscar as notícias da categoria "Convênios"
    useEffect(() => {
        const fetchConvenios = async () => {
            setLoading(true);
            try {
                // Constrói os parâmetros da query para a API
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: noticiasPerPage.toString(),
                    categoria: 'Convênios', // Filtra especificamente pela categoria
                });

                // Faz a requisição para a API de notícias
                const response = await fetch(`/api/news?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar notícias de convênios');
                }
                const data = await response.json();
                setConveniosNoticias(data.news || []); // Armazena as notícias encontradas
                setTotalPages(data.totalPages || 0); // Armazena o total de páginas

            } catch (error) {
                console.error("Erro ao buscar convênios:", error);
                setConveniosNoticias([]); // Limpa em caso de erro
                setTotalPages(0);
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchConvenios();
    }, [currentPage]); // Re-executa quando a página atual mudar

    // Função para mudar de página
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <div className="min-h-screen flex flex-col">
            <div className="-mx-[10%]">
                <SocialBar />
                <Navbar />
            </div>

            <main className="flex-grow mx-[10%] py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">CONVÊNIOS SINDEPRO</h1>
                    <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
                        O SINDEPRO tem orgulho de oferecer aos seus associados parcerias exclusivas
                        com diversas instituições de qualidade. Conheça nossos convênios abaixo.
                    </p>
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Carregando convênios...</div>
                    ) : conveniosNoticias.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {conveniosNoticias.map((noticia) => (
                                <Link
                                    key={noticia._id} 
                                    href={`/noticias/${noticia._id}`} 
                                    className="transition-all duration-300 hover:scale-105 group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"> 
                                        <div className="relative h-48 flex-shrink-0"> 
                                            <Image
                                                src={noticia.imagem || '/general/no-image.jpg'} // Imagem da notícia
                                                alt={noticia.titulo} // Usa o título como alt text
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Ajuste sizes conforme layout
                                                style={{ objectFit: "cover" }}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                                // unoptimized={true} // Remova se possível para otimização
                                            />
                                            {/* Overlay no hover */}
                                        </div>
                                        <div className="p-4 text-center mt-auto"> {/* mt-auto para empurrar para baixo se houver espaço */}
                                            <h2 className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                                                {noticia.titulo} {/* Título da notícia */}
                                            </h2>
                                             {/* Removido o <p> "Clique para mais informações" */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // Mensagem se nenhum convênio for encontrado
                         <div className="text-center py-10 text-gray-500">Nenhum convênio encontrado.</div>
                    )}

                    {/* Controles de Paginação */}
                    {!loading && totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center space-x-2">
                            {/* Botão Anterior */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-700 text-white hover:bg-red-800'
                                    }`}
                            >
                                Anterior
                            </button>

                            {/* Indicador de Página */}
                            <span className="text-sm text-gray-700">
                                Página {currentPage} de {totalPages}
                            </span>

                            {/* Botão Próxima */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-700 text-white hover:bg-red-800'
                                    }`}
                            >
                                Próxima
                            </button>
                        </div>
                    )}

                </div>
            </main>

            <div className="-mx-[10%]">
                <Footer />
            </div>
            <OfflineNotice />
        </div>
    );
}