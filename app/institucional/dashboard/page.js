//app/institucional/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ConfirmationModal from '@/components/ConfirmationModal';
import CopyNotification from '@/components/CopyNotification';
import padlock from '@/public/general/padlock.png';
import ImageUploader from '@/components/ImageUploader';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('noticias');
  const [showForm, setShowForm] = useState(false);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    autor: ''
  });

  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    imagem: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const [configs, setConfigs] = useState({
    L1: '', L2: '', L3: '', L4: '', L5: '', L6: '', L7: '', L8: '',
    S1: '', S2: '', S3: '', C1: '', C2: '', C3: '', C4: '',
    D1: '', D2: '', D3: '', D4: '',
    E1: '', E2: ''
  });

  const categorias = [
    'Política', 'Jurídica', 'Eventos', 'Conquistas', 'Capacitação', 'Convênios'
  ];

  useEffect(() => {
    fetchNews();
  }, [currentPage, filters]);

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (activeTab === 'usuarios') {
      fetchUsers();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'destaques') {
      fetchConfigs();
    }
  }, [activeTab]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        ...filters
      });

      const response = await fetch(`/api/news?${queryParams}`);
      const data = await response.json();
      
      setNews(data.news);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/configs');
      const data = await response.json();
      setConfigs(data);
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          autor: session.user.name,
        }),
      });

      if (response.ok) {
        setFormData({
          titulo: '',
          categoria: '',
          data: new Date().toISOString().split('T')[0],
          descricao: '',
          imagem: ''
        });
        setShowForm(false);
        fetchNews();
      }
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }
  };

  const handleDelete = async (newsId) => {
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNews();
        setShowDeleteModal(false);
        setNewsToDelete(null);
      }
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
    }
  };

  const handleUpdateUserStatus = async (userId, field, value) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
        setShowDeleteUserModal(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configs),
      });

      if (response.ok) {
        setShowSaveNotification(true);
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    }
  };

  // Função para renderizar o conteúdo baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'noticias':
    return (
          <>
            <div className="my-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciamento de publicações</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors"
              >
                {showForm ? 'Fechar Formulário' : 'Nova Notícia'}
              </button>
            </div>

            {/* Filtros de Pesquisa */}
            <div className="mb-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Pesquisar por título"
                      value={filters.titulo}
                      onChange={(e) => setFilters({...filters, titulo: e.target.value})}
                      className="border border-gray-500 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                    />
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Pesquisar por descrição"
                      value={filters.descricao}
                      onChange={(e) => setFilters({...filters, descricao: e.target.value})}
                      className="border border-gray-500 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                    />
                  </div>

                  <div className="flex flex-col">
                    <select
                      value={filters.categoria}
                      onChange={(e) => setFilters({...filters, categoria: e.target.value})}
                      className="border border-gray-500 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-black"
                    >
                      <option value="">Todas as categorias</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Pesquisar por autor"
                      value={filters.autor}
                      onChange={(e) => setFilters({...filters, autor: e.target.value})}
                      className="border border-gray-500 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            {showForm && (
              <form onSubmit={handleSubmit} className="mb-8 text-black space-y-4 p-4 border rounded">
                <div>
                  <label className="block mb-1">Título*</label>
                  <input
                    type="text"
                    required
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Categoria*</label>
                  <select
                    required
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Data</label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Descrição*</label>
                  <textarea
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    className="w-full border p-2 rounded h-32"
                  />
                </div>

      <div>
                  <label className="block mb-1">Imagem da Notícia</label>
                  <ImageUploader
                    onImageUpload={(url) => setFormData({ ...formData, imagem: url })}
                  />
                  {formData.imagem && (
                    <div className="mt-2">
                      <img
                        src={formData.imagem}
                        alt="Preview"
                        className="w-full max-w-xs h-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imagem: '' })}
                        className="text-red-600 text-sm mt-2 hover:text-red-800"
                      >
                        Remover imagem
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors"
                >
                  Publicar Notícia
                </button>
              </form>
            )}

            {/* Lista de Notícias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
              {loading ? (
                <p>Carregando...</p>
              ) : news.length > 0 ? (
                news.map((item) => (
                  <div 
                    key={item._id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                  >
                    {/* Botão Editar */}
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item._id);
                          setShowCopyNotification(true);
                        }}
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                        title="Copiar ID"
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
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </button>
                      <Link
                        href={`/institucional/dashboard/${item._id}`}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        title="Editar notícia"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => {
                          setNewsToDelete(item);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        title="Deletar notícia"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="relative h-48">
                      <img
                        src={item.imagem || '/general/no-image.jpg'}
                        alt={item.titulo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-red-700 text-white px-2 py-1 text-sm">
                        {item.categoria}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xl text-red-700 mb-2 line-clamp-2 hover:text-red-800 transition-colors">
                        {item.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.descricao}
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                          <span className='text-xs'>
                          {item.autor}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                          </svg>
                          <span className='text-xs'>
                          {new Date(item.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <Link 
                        href={`/noticias/${item._id}`}
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
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  Ainda não há notícias publicadas
                </p>
              )}
            </div>

            {/* Paginação Atualizada */}
            <div className="mt-2 flex justify-center">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || news.length === 0}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
                    ${currentPage === 1 || news.length === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-red-700 text-white hover:bg-red-800'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Anterior
                </button>

                <span className="px-4 mb-4 py-2 text-sm text-gray-700">
                  Página {currentPage} de {totalPages || 1}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || news.length === 0}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
                    ${currentPage === totalPages || news.length === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-red-700 text-white hover:bg-red-800'
                    }`}
                >
                  Próxima
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </nav>
          </div>
          </>
        );
      case 'destaques':
        return (
          <div className="bg-white p-2 my-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Configuração de destaques em geral</h2>
            
            <form onSubmit={handleConfigSubmit} className="text-black space-y-8">
              {/* Grupo 1 */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg text-red-700 font-medium mb-4">Notícias de linha</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={configs[field] || ''}
                        onChange={(e) => setConfigs({...configs, [field]: e.target.value})}
                        className="w-full border border-gray-300 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Grupo 2 */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg text-red-700 font-medium mb-4">Notícias de <span className='text-red-700 underline'>slide</span> e <span className='text-red-700 underline'>colunas</span> existentes no carrossel</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['S1', 'S2', 'S3', 'C1', 'C2', 'C3', 'C4'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={configs[field] || ''}
                        onChange={(e) => setConfigs({...configs, [field]: e.target.value})}
                        className="w-full border border-gray-300 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Grupo 3 */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg text-red-700 font-medium mb-4">Notícias em destaque</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['D1', 'D2', 'D3', 'D4'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={configs[field] || ''}
                        onChange={(e) => setConfigs({...configs, [field]: e.target.value})}
                        className="w-full border border-gray-300 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Grupo 4 */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg text-red-700 font-medium mb-4">Notícias dos próximos eventos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['E1', 'E2'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={configs[field] || ''}
                        onChange={(e) => setConfigs({...configs, [field]: e.target.value})}
                        className="w-full border border-gray-300 rounded-md mb-2 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-black"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors"
                >
                  Salvar Configurações
                </button>
              </div>
            </form>
          </div>
        );
      case 'usuarios':
        return (
          <div className="bg-white my-4 p-2 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Listagem e gerenciamento de usuários</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ativo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                        {user.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                        {user.matricula}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.isActive ? 'true' : 'false'}
                          onChange={(e) => handleUpdateUserStatus(user._id, 'isActive', e.target.value === 'true')}
                          className="text-sm border rounded p-1 text-black"
                        >
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.isAdmin ? 'true' : 'false'}
                          onChange={(e) => handleUpdateUserStatus(user._id, 'isAdmin', e.target.value === 'true')}
                          className="text-sm border rounded p-1 text-black"
                        >
                          <option value="true">Sim</option>
                          <option value="false">Não</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteUserModal(true);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <>
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>
      
      <main className="flex-grow bg-white mt-2 rounded-lg bg-white mx-[10%]">
        {/* Título do Painel */}
        <div className="mb-2 flex ">
          <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
          <Image src={padlock} alt="padlock" className="w-8 h-8" /> 
        </div>

        {/* Abas */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('noticias')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'noticias'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notícias
              </button>
              <button
                onClick={() => setActiveTab('destaques')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'destaques'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Destaques
              </button>
              <button
                onClick={() => setActiveTab('usuarios')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'usuarios'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usuários
              </button>
            </nav>
          </div>
        </div>

        {/* Conteúdo da Aba */}
        <div className="mt-2">
          {renderTabContent()}
      </div>
      </main>

      <div className="-mx-[10%]">
        <Footer />
      </div>

      <ConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setNewsToDelete(null);
        }}
        onConfirm={() => handleDelete(newsToDelete?._id)}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja deletar a notícia "${newsToDelete?.titulo}"? Esta ação não pode ser desfeita.`}
      />

      <ConfirmationModal 
        isOpen={showDeleteUserModal}
        onClose={() => {
          setShowDeleteUserModal(false);
          setUserToDelete(null);
        }}
        onConfirm={() => handleDeleteUser(userToDelete?._id)}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja deletar o usuário "${userToDelete?.name}"? Esta ação não pode ser desfeita.`}
      />

      <CopyNotification
        isVisible={showCopyNotification}
        onClose={() => setShowCopyNotification(false)}
        message="ID copiado com sucesso!"
      />

      <CopyNotification
        isVisible={showSaveNotification}
        onClose={() => setShowSaveNotification(false)}
        message="Configurações salvas com sucesso!"
      />
    </>
    );
  }