//app/noticias/page.js
'use client'
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SocialBar from "../../components/SocialBar";

export default function TodasNoticias() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Aumentei para 8 itens por página

  // Categorias simuladas
  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'Política', nome: 'Política' },
    { id: 'Jurídica', nome: 'Jurídica' },
    { id: 'Eventos', nome: 'Eventos' },
    { id: 'Conquistas', nome: 'Conquistas' },
    { id: 'Capacitação', nome: 'Capacitação' }
  ];

  // Dados simulados de notícias
  const noticias = [
    {
      id: 1,
      titulo: "Assembleia Geral discute melhorias salariais",
      autor: "Maria Silva",
      categoria: "Política",
      data: "24/03/2024",
      descricao: "Delegados se reúnem para debater propostas de reajuste e benefícios.",
      imagem: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg"
    },
    {
      id: 2,
      titulo: "Novo convênio com plano de saúde",
      autor: "João Santos",
      categoria: "Conquistas",
      data: "23/03/2024",
      descricao: "SINDEPRO firma parceria com operadora de saúde para beneficiar associados.",
      imagem: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg"
    },
    {
      id: 3,
      titulo: "Curso de atualização em investigação",
      autor: "Pedro Oliveira",
      categoria: "Capacitação",
      data: "22/03/2024",
      descricao: "Inscrições abertas para capacitação em novas técnicas investigativas.",
      imagem: "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg"
    },
    {
      id: 4,
      titulo: "Conquista: aprovação de adicional",
      autor: "Ana Martins",
      categoria: "Conquistas",
      data: "21/03/2024",
      descricao: "Categoria celebra aprovação de adicional de periculosidade.",
      imagem: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
    },
    {
      id: 5,
      titulo: "Encontro Nacional de Delegados",
      autor: "Carlos Lima",
      categoria: "Eventos",
      data: "20/03/2024",
      descricao: "SINDEPRO participará do encontro nacional em Brasília.",
      imagem: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
    },
    {
      id: 6,
      titulo: "Nova sede administrativa",
      autor: "Luciana Costa",
      categoria: "Conquistas",
      data: "19/03/2024",
      descricao: "Inauguração das novas instalações do sindicato prevista para abril.",
      imagem: "https://images.pexels.com/photos/1531677/pexels-photo-1531677.jpeg"
    },
    {
      id: 7,
      titulo: "Parceria com instituição de ensino",
      autor: "Roberto Alves",
      categoria: "Capacitação",
      data: "18/03/2024",
      descricao: "Descontos especiais em pós-graduação para associados.",
      imagem: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
    },
    {
      id: 8,
      titulo: "Vitória judicial para a categoria",
      autor: "Fernanda Souza",
      categoria: "Jurídica",
      data: "17/03/2024",
      descricao: "Decisão favorável em ação coletiva sobre direitos dos delegados.",
      imagem: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg"
    },
    {
      id: 9,
      titulo: "Programa de preparação para aposentadoria",
      autor: "Paulo Mendes",
      categoria: "Conquistas",
      data: "16/03/2024",
      descricao: "Workshop sobre planejamento financeiro e previdência.",
      imagem: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg"
    },
    {
      id: 10,
      titulo: "Modernização das delegacias",
      autor: "Amanda Reis",
      categoria: "Eventos",
      data: "15/03/2024",
      descricao: "SINDEPRO apresenta projeto de renovação tecnológica.",
      imagem: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
    }
  ];

  // Filtrar notícias
  const noticiasFiltradas = noticias.filter(noticia => {
    const matchesSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         noticia.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(noticiasFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNoticias = noticiasFiltradas.slice(startIndex, endIndex);

  // Reset da página ao mudar de categoria
  const handleCategoriaChange = (categoria) => {
    setSelectedCategory(categoria);
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentNoticias.map((noticia) => (
              <div key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-40">
                  <Image
                    src={noticia.imagem}
                    alt={noticia.titulo}
                    fill
                    className="object-cover"
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
                      {noticia.autor}
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {noticia.data}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {noticia.descricao}
                  </p>
                  <Link 
                    href={`/noticias/${noticia.id}`}
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

          {/* Paginação */}
          <div className="mt-8 flex justify-center space-x-2">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 