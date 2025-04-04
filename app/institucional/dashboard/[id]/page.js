//app/institucional/dashboard/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
// Importe useParams
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';

// Remova a prop { params } daqui
export default function EditarNoticia() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Chame useParams para obter os parâmetros da rota
  const params = useParams();
  // Acesse o id a partir do objeto params retornado pelo hook
  const id = params?.id; // Use optional chaining para segurança

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noticia, setNoticia] = useState(null);

  const categorias = [
    'Política', 'Jurídica', 'Eventos', 'Conquistas', 'Capacitação', 'Convênios'
  ];

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchNoticia = async () => {
      // Use a variável 'id' obtida de useParams
      if (!id) return;

      try {
        // Use a variável 'id' obtida de useParams
        const response = await fetch(`/api/news/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNoticia({
            ...data,
            data: new Date(data.data).toISOString().split('T')[0]
          });
        } else {
          router.push('/institucional/dashboard');
        }
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
        router.push('/institucional/dashboard');
      } finally {
        setLoading(false);
      }
    };

    // Adicione 'id' como dependência
    fetchNoticia();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use a variável 'id' obtida de useParams
    if (!id) return;

    setSaving(true);

    try {
       // Use a variável 'id' obtida de useParams
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticia),
      });

      if (response.ok) {
        router.push('/institucional/dashboard');
      }
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Carregando...</div>;
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  if (!noticia) {
    // Verifique se o loading terminou antes de mostrar "Não encontrada"
    if (!loading) {
       return <div>Notícia não encontrada ou ID inválido.</div>;
    }
    return <div>Carregando...</div>; // Ou mantenha o loading
  }

  return (
    <>
      <Navbar />
      <SocialBar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Editar Notícia</h1>
            <button
              onClick={() => router.push('/institucional/dashboard')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-md space-y-6">
            {/* ... restante do formulário ... */}
             <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Título*
              </label>
              <input
                type="text"
                required
                value={noticia.titulo}
                onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Categoria*
              </label>
              <select
                required
                value={noticia.categoria}
                onChange={(e) => setNoticia({ ...noticia, categoria: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                value={noticia.data}
                onChange={(e) => setNoticia({ ...noticia, data: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Descrição*
              </label>
              <textarea
                required
                value={noticia.descricao}
                onChange={(e) => setNoticia({ ...noticia, descricao: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Imagem da Notícia
              </label>
              <ImageUploader
                onImageUpload={(url) => setNoticia({ ...noticia, imagem: url })}
              />
              {noticia?.imagem && (
                <div className="mt-2">
                  <img
                    src={noticia.imagem}
                    alt="Preview"
                    className="w-full max-w-xs h-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setNoticia({ ...noticia, imagem: '' })}
                    className="text-red-600 text-sm mt-2 hover:text-red-800"
                  >
                    Remover imagem
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/institucional/dashboard')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors disabled:bg-gray-400"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}