//app/noticias/page.js
'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialBar from "../../components/SocialBar";

export default function TodasNoticias() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [noticias, setNoticias] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Categorias
  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'Política', nome: 'Política' },
    { id: 'Jurídica', nome: 'Jurídica' },
    { id: 'Eventos', nome: 'Eventos' },
    { id: 'Conquistas', nome: 'Conquistas' },
    { id: 'Capacitação', nome: 'Capacitação' },
    { id: 'Convênios', nome: 'Convênios' }
  ];

  // Hook para buscar notícias quando filtros ou página mudam
  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      try {
        // Constrói os parâmetros da query
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
          titulo: searchTerm,
          descricao: searchTerm,
          categoria: selectedCategory === 'todas' ? '' : selectedCategory,
        });

        const response = await fetch(`/api/news?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar notícias');
        }
        const data = await response.json();
        setNoticias(data.news || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setNoticias([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [currentPage, searchTerm, selectedCategory]);

  // Reset da página ao mudar de categoria ou fazer busca
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleCategoriaChange = (categoria) => {
    setSelectedCategory(categoria);
    handleFilterChange();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Função para lidar com o submit da busca (pressionar Enter, por exemplo)
  const handleSearchSubmit = () => {
     setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SocialBar />
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">

          {/* Filtros */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Pesquisar notícias..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                      ${selectedCategory === cat.id
                        ? 'bg-red-700 text-white'
                        : 'bg-white text-gray-700 hover:bg-red-50'}`}
                    onClick={() => handleCategoriaChange(cat.id)}
                  >
                    {cat.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de notícias estilo jornal */}
          {loading ? (
            <div className="text-center py-10">Carregando notícias...</div>
          ) : noticias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {noticias.map((noticia) => (
                <div key={noticia._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-40">
                    <Image
                      src={noticia.imagem || "/general/no-image.jpg"}
                      alt={noticia.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      unoptimized={true}
                    />
                    <div className="absolute top-0 right-0 bg-red-700 text-white px-2 py-1 text-xs rounded-bl-lg">
                      {noticia.categoria}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {noticia.titulo}
                    </h2>
                    <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {noticia.autor || 'Autor desconhecido'}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(noticia.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {noticia.descricao}
                    </p>
                    <Link 
                      href={`/noticias/${noticia._id}`}
                      className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center"
                    >
                      Ler mais
                      <svg 
                        className="w-4 h-4 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-gray-600">Nenhuma notícia encontrada.</div>
          )}

          {/* Paginação - Usa totalPages do estado */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
                  currentPage === 1
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === page
                      ? 'bg-red-700 text-white'
                      : 'bg-white text-gray-700 hover:bg-red-50'
                  } transition-colors duration-300`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                 className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 