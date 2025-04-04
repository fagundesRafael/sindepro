// app/noticias/[id]/page.js
"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import AuthNotification from '@/components/AuthNotification'; // Importa o componente de notificação
import Link from 'next/link';

export default function NoticiaDetalhada() {
  const params = useParams();
  const id = params?.id; // Usa optional chaining por segurança
  const { data: session, status } = useSession(); // Obtém o status da sessão também
  const router = useRouter();

  // Estados do componente
  const [noticia, setNoticia] = useState(null);
  const [loadingNoticia, setLoadingNoticia] = useState(true); // Estado de loading específico para notícia
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);
  const [curtidas, setCurtidas] = useState(0);
  const [jaCurtiu, setJaCurtiu] = useState(false);
  const [mensagemGeral, setMensagemGeral] = useState({ tipo: '', texto: '' }); // Para mensagens gerais no topo (opcional)

  // Estados para a nova notificação inferior esquerda
  const [showAuthNotification, setShowAuthNotification] = useState(false);
  const [authNotificationMessage, setAuthNotificationMessage] = useState('');
  const [authNotificationType, setAuthNotificationType] = useState('error'); // 'error' ou 'warning'

  // Efeito para buscar os dados da notícia e comentários iniciais
  useEffect(() => {
    // Só busca se tiver um ID
    if (!id) {
        setLoadingNoticia(false); // Para o loading se não tiver ID
        setMensagemGeral({ tipo: 'erro', texto: 'ID da notícia inválido.' });
        return;
    };

    const fetchNoticiaData = async () => {
      setLoadingNoticia(true); // Inicia loading da notícia
      setLoadingComentarios(true); // Inicia loading dos comentários
      try {
        // Busca a notícia
        const resNoticia = await fetch(`/api/news/${id}`);
        if (!resNoticia.ok) {
          const errorData = await resNoticia.json().catch(() => ({}));
          throw new Error(errorData.error || `Falha ao buscar notícia (status: ${resNoticia.status})`);
        }
        const dataNoticia = await resNoticia.json();
        setNoticia(dataNoticia);
        setCurtidas(dataNoticia.curtidas || 0);

        // Busca os comentários
        await carregarComentarios();

        // Verifica a curtida se o usuário estiver logado
        // A sessão pode ainda estar carregando ('loading'), então verificamos 'authenticated'
        if (status === 'authenticated' && session?.user) {
          verificarCurtida();
        }

      } catch (error) {
        console.error('Erro ao carregar dados da página da notícia:', error);
        setNoticia(null); // Limpa notícia em caso de erro
        setMensagemGeral({ tipo: 'erro', texto: error.message || 'Erro ao carregar dados da notícia.' });
      } finally {
        setLoadingNoticia(false); // Finaliza loading da notícia
        // Loading dos comentários é finalizado dentro de carregarComentarios
      }
    };

    fetchNoticiaData();
  // Depende do id e do status da sessão (para verificar curtida quando logar)
  }, [id, status]); // Removido session daqui para evitar re-fetch desnecessário se só dados da sessão mudarem sem mudar status

  // Função para carregar ou recarregar comentários
  const carregarComentarios = async () => {
    if (!id) return;
    setLoadingComentarios(true);
    try {
      const response = await fetch(`/api/comentarios/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Falha ao buscar comentários (status: ${response.status})`);
      }
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      setMensagemGeral({ tipo: 'erro', texto: 'Erro ao carregar comentários.' }); // Mostra erro geral
    } finally {
       setLoadingComentarios(false);
    }
  };

  // Função para verificar se o usuário já curtiu (executada se logado)
  const verificarCurtida = async () => {
    // Adiciona verificação de status para garantir que session.user.id está disponível
    if (status !== 'authenticated' || !session?.user?.id || !id) return;
    try {
      const response = await fetch(`/api/curtidas/check/${id}?userId=${session.user.id}`);
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.error || `Falha ao verificar curtida (status: ${response.status})`);
      }
      const data = await response.json();
      setJaCurtiu(data.jaCurtiu);
    } catch (error) {
      console.error('Erro ao verificar curtida:', error);
      // Não mostra notificação para erro silencioso de verificação
    }
  };

  // Função para curtir/descurtir
  const handleCurtir = async () => {
    // Verifica se está logado
    if (status !== 'authenticated' || !session) {
      setAuthNotificationMessage('Você precisa estar logado para curtir.');
      setAuthNotificationType('error');
      setShowAuthNotification(true);
      setTimeout(() => router.push('/login'), 3000);
      return;
    }
    // Verifica se está ATIVO
    if (!session.user?.isActive) {
      setAuthNotificationMessage('Sua conta está inativa. Não é possível curtir.');
      setAuthNotificationType('warning');
      setShowAuthNotification(true);
      return;
    }
    if (!id) return;

    try {
      // !! IMPORTANTE: A API POST /api/curtidas/[id] precisa existir e ter a lógica correta !!
      // Assumindo que ela existe e retorna { totalCurtidas: number, curtiu: boolean } onde 'curtiu' é o NOVO estado.
      const response = await fetch(`/api/curtidas/${id}`, { // Chamando a API com ID na URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // O body pode ser vazio ou enviar o userId se a API precisar
        // body: JSON.stringify({ userId: session.user.id }) // Descomente se a API precisar
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Verifica se é erro de conta inativa vindo da API (se a API for implementada assim)
         if (response.status === 403 && errorData.error?.includes('inativa')) {
             setAuthNotificationMessage(errorData.error);
             setAuthNotificationType('warning');
             setShowAuthNotification(true);
             return; // Não continua
         }
        throw new Error(errorData.error || `Falha ao curtir/descurtir (status: ${response.status})`);
      }

      const data = await response.json(); // Espera { totalCurtidas: number, curtiu: boolean (novo estado) }

      setCurtidas(data.totalCurtidas);
      setJaCurtiu(data.curtiu); // Define o estado baseado na resposta da API
      setMensagemGeral({ // Usa a mensagem geral no topo para sucesso da curtida
        tipo: 'sucesso',
        texto: data.curtiu ? 'Notícia curtida!' : 'Curtida removida.'
      });

    } catch (error) {
      console.error('Erro ao curtir:', error);
      setAuthNotificationMessage(error.message || 'Erro ao processar sua curtida.');
      setAuthNotificationType('error');
      setShowAuthNotification(true);
    }
  };

  // Função para enviar comentário
  const handleComentario = async (e) => {
    e.preventDefault();

    // Verifica se está logado
    if (status !== 'authenticated' || !session) {
      setAuthNotificationMessage('Você precisa estar logado para comentar.');
      setAuthNotificationType('error');
      setShowAuthNotification(true);
      setTimeout(() => router.push('/login'), 3000);
      return;
    }
    // Verifica se está ATIVO (client-side para feedback rápido)
    if (!session.user?.isActive) {
      setAuthNotificationMessage('Sua conta está inativa. Não é possível comentar.');
      setAuthNotificationType('warning');
      setShowAuthNotification(true);
      return; // Impede o envio para a API
    }
    if (!id || !comentario.trim()) return; // Verifica ID e texto

    try {
      const response = await fetch(`/api/comentarios/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: comentario }),
      });

      if (response.ok) {
        setComentario(''); // Limpa o campo
        await carregarComentarios(); // Recarrega a lista
        setMensagemGeral({ tipo: 'sucesso', texto: 'Comentário adicionado!' }); // Feedback no topo
      } else {
        // Erro vindo da API
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido ao postar comentário' }));
        let errorMessage = errorData.error || 'Falha ao adicionar comentário';

        // Mostra a notificação customizada com a mensagem da API
        setAuthNotificationMessage(errorMessage);
        setAuthNotificationType(response.status === 403 ? 'warning' : 'error'); // Usa warning para 403
        setShowAuthNotification(true);

        console.error('Erro ao comentar (API respondeu com erro):', response.status, errorData);
      }
    } catch (error) { // Erro de rede ou outro erro do fetch
      console.error('Erro na função handleComentario (fetch):', error);
      // Mostra notificação para erros inesperados
      setAuthNotificationMessage('Erro de rede ao enviar comentário.');
      setAuthNotificationType('error');
      setShowAuthNotification(true);
    }
  };

  // Efeito para limpar a mensagem geral no topo após um tempo
  useEffect(() => {
    if (mensagemGeral.texto) {
      const timer = setTimeout(() => setMensagemGeral({ tipo: '', texto: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemGeral]);

  // -------- Renderização --------

  // Estado de Carregamento Inicial (sessão ou notícia)
  if (status === 'loading' || loadingNoticia) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="-mx-[10%]">
          <SocialBar />
          <Navbar />
        </div>
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center mx-[10%]">
          <p>Carregando...</p>
        </main>
        <div className="-mx-[10%]">
          <Footer />
        </div>
      </div>
    );
  }

  // Estado de Erro ao Carregar Notícia ou ID inválido
   if (!noticia) {
     return (
       <div className="min-h-screen flex flex-col">
         <div className="-mx-[10%]">
           <SocialBar />
           <Navbar />
         </div>
         <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center mx-[10%]">
           <p className="text-red-600 text-xl mb-4">{mensagemGeral.texto || 'Não foi possível carregar a notícia ou o ID é inválido.'}</p>
           <button
             onClick={() => router.back()}
             className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
           >
             Voltar
           </button>
         </main>
         <div className="-mx-[10%]">
           <Footer />
         </div>
       </div>
     );
   }

  // Renderização Principal (Notícia Carregada)
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>

      <main className="flex-grow mt-2 rounded-lg bg-white mx-[10%]">
        {/* Mensagem de Feedback Geral (Topo) */}
        {mensagemGeral.texto && (
             <div className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
               mensagemGeral.tipo === 'sucesso' ? 'bg-green-500' : 'bg-red-500'
             } text-white transition-opacity duration-500`} role="alert">
               {mensagemGeral.texto}
             </div>
           )}

        {/* Notificação de Autenticação/Autorização (Inferior Esquerdo) */}
        <AuthNotification
            isVisible={showAuthNotification}
            onClose={() => setShowAuthNotification(false)}
            message={authNotificationMessage}
            type={authNotificationType}
        />

        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-red-700 hover:text-red-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>

        {/* Conteúdo da Notícia */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Imagem */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src={noticia.imagem || '/general/no-image.jpg'}
              alt={noticia.titulo || 'Imagem da notícia'}
              fill
              className="object-cover" // Garante que a imagem cubra a área
              unoptimized={true} // Desativa otimização do Next.js se usar URLs externas ou Cloudinary free
              priority // Carrega a imagem principal com prioridade
            />
          </div>

          {/* Detalhes e Conteúdo */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {noticia.categoria}
              </span>
              <div className="text-gray-500 text-xs sm:text-sm">
                {noticia.data ? new Date(noticia.data).toLocaleDateString('pt-BR', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }) : 'Data indisponível'}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{noticia.titulo}</h1>
            <p className="text-sm text-gray-600 mb-6">Por <span className="font-semibold">{noticia.autor || 'Autor desconhecido'}</span></p>

            {/* Descrição formatada */}
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed mb-8">
              {/* Renderiza parágrafos a partir de quebras de linha */}
              {noticia.descricao?.split('\n').map((paragrafo, index) => (
                paragrafo.trim() ? <p key={index}>{paragrafo}</p> : null // Ignora linhas vazias
              ))}
            </div>

            {/* Seção de Curtidas */}
            <div className="flex items-center gap-4 mb-8 border-t pt-6">
               <h2 className="text-lg font-semibold text-gray-800 mr-4">Gostou?</h2>
              <button
                onClick={handleCurtir}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ease-in-out text-sm ${
                  jaCurtiu
                  ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-offset-2 ring-red-600' // Estilo quando curtido
                  : 'bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 ring-1 ring-gray-200 hover:ring-red-200' // Estilo quando não curtido
                } ${status !== 'authenticated' ? 'opacity-60 cursor-not-allowed' : ''}`} // Desabilitado visualmente se não logado
                aria-pressed={jaCurtiu}
                disabled={status !== 'authenticated'} // Desabilita se não logado
                title={status !== 'authenticated' ? 'Faça login para curtir' : (jaCurtiu ? 'Descurtir' : 'Curtir')}
              >
                <svg className={`w-5 h-5 transition-colors ${jaCurtiu ? 'text-white' : 'text-red-500'}`} // Cor do coração
                     fill={jaCurtiu ? "currentColor" : "none"}
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">{curtidas}</span>
                <span className="hidden sm:inline">{curtidas === 1 ? 'Curtida' : 'Curtidas'}</span>
              </button>
            </div>

            {/* Seção de Comentários */}
            <div className="border-t pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Comentários ({comentarios.length})</h2>

              {/* Formulário de Comentário ou Mensagem */}
              {status === 'authenticated' ? ( // Verifica se está logado
                session.user?.isActive ? ( // Se logado, verifica se está ATIVO
                  <form onSubmit={handleComentario} className="mb-8">
                    <label htmlFor="comentario-texto" className="sr-only">Seu comentário</label>
                    <textarea
                      id="comentario-texto"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      rows="4"
                      placeholder="Escreva seu comentário aqui..."
                      required
                      aria-label="Campo para escrever comentário"
                    />
                    <button
                      type="submit"
                      className="mt-3 px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!comentario.trim() || status !== 'authenticated'} // Dupla verificação
                    >
                      Enviar Comentário
                    </button>
                  </form>
                ) : ( // Logado, mas INATIVO
                  <div className="mb-8 text-yellow-800 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm" role="alert">
                    <p><span className="font-semibold">Atenção:</span> Sua conta está pendente de ativação pelo administrador. Você não pode comentar ou curtir no momento.</p>
                  </div>
                )
              ) : ( // NÃO está logado
                <p className="mb-8 text-gray-600 text-sm">
                  Você precisa <Link href="/login" className="text-red-700 hover:underline font-medium">fazer login</Link> para comentar ou curtir.
                </p>
              )}

              {/* Lista de Comentários */}
              <div className="space-y-6">
                {loadingComentarios ? (
                   <p className="text-gray-500">Carregando comentários...</p>
                ) : comentarios.length > 0 ? (
                  comentarios.map((comentario) => (
                    <div key={comentario._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <span className="font-semibold text-gray-800 text-sm">{comentario.autor || 'Usuário'}</span>
                        <span className="text-xs text-gray-500">
                          {comentario.data ? new Date(comentario.data).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      {/* Usa 'whitespace-pre-wrap' para respeitar quebras de linha e espaços */}
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{comentario.texto}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Ainda não há comentários. Seja o primeiro!</p>
                )}
              </div>
            </div> {/* Fim da Seção de Comentários */}
          </div> {/* Fim do Padding Principal */}
        </article> {/* Fim do Article da Notícia */}
      </main>

      <div className="-mx-[10%]">
        <Footer />
      </div>
    </div>
  );
}