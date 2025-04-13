// app/api/comentarios/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb'; // Certifique-se que este é o caminho correto para sua conexão
import Comentario from '@/models/Comentario'; // Certifique-se que este é o caminho correto para seu modelo

// ***** IMPORTAÇÃO NECESSÁRIA *****
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajuste o caminho se sua estrutura for diferente
// *********************************

export async function GET(request, { params }) { // params aqui é a Promise
  console.log('Params recebidos em GET (Promise):', params); // Confirma que é uma Promise
  let noticiaId; // Para log no catch

  try {
    // Faz o await da Promise 'params'
    const resolvedParams = await params;
    console.log('Params Resolvidos em GET:', resolvedParams);
    noticiaId = resolvedParams.id; // Acessa .id do objeto RESOLVIDO

    // Verificação: O ID existe após resolver?
    if (!noticiaId) {
      console.error("ID da notícia não encontrado nos parâmetros resolvidos (GET):", resolvedParams);
      return NextResponse.json({ error: 'ID da notícia ausente nos parâmetros' }, { status: 400 });
    }

    await connectDB(); // Conecta ao DB
    console.log(`MongoDB conectado para buscar comentários da notícia: ${noticiaId}`);

    // Busca comentários pelo ID da notícia resolvido
    const comentarios = await Comentario.find({ noticia: noticiaId })
      .sort({ data: -1 }); // Ordena pelos mais recentes

    return NextResponse.json(comentarios); // Retorna os comentários encontrados

  } catch (error) {
    console.error(`Erro na rota GET /api/comentarios/${noticiaId || '[ID não resolvido]'}:`, error);
    return NextResponse.json({ error: 'Falha ao processar a requisição de busca de comentários' }, { status: 500 });
  }
}

export async function POST(request, { params }) { // params aqui é a Promise
  console.log('Params recebidos em POST (Promise):', params);
  let noticiaId; // Declarar fora para usar no catch se necessário

  try {
    // Faz o await da Promise 'params'
    const resolvedParams = await params;
    console.log('Params Resolvidos em POST:', resolvedParams);
    noticiaId = resolvedParams.id; // Atribui ao escopo externo

    // Verificação: O ID da notícia existe?
    if (!noticiaId) {
      console.error("ID da notícia não encontrado nos parâmetros resolvidos (POST):", resolvedParams);
      return NextResponse.json({ error: 'ID da notícia ausente nos parâmetros' }, { status: 400 });
    }

    // ***** OBTÉM A SESSÃO PASSANDO authOptions *****
    const session = await getServerSession(authOptions);

    // Verifica se está logado
    if (!session || !session.user) {
      console.log(`Tentativa de comentário bloqueada: Usuário não autenticado.`);
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Verifica se o usuário está ativo
    if (!session.user.isActive) {
      console.log(`Tentativa de comentário bloqueada: Usuário ${session.user.id} INATIVO.`);
      return NextResponse.json({ error: 'Sua conta está inativa. Não é possível comentar.' }, { status: 403 });
    }

    // Se chegou aqui, usuário está logado E ativo.

    await connectDB(); // Conecta ao DB
    console.log(`MongoDB conectado para postar comentário na notícia: ${noticiaId}`);

    // Obtém o texto do comentário do corpo da requisição
    const { texto } = await request.json();
    if (!texto || !texto.trim()) { // Verifica se o texto não está vazio ou só com espaços
      return NextResponse.json({ error: 'O texto do comentário é obrigatório' }, { status: 400 });
    }

    // Cria a nova instância do Comentário
    const comentario = new Comentario({
      noticia: noticiaId,        // ID da notícia
      usuario: session.user.id,  // ID do usuário logado e ativo
      autor: session.user.name,  // Nome do usuário logado e ativo
      texto: texto.trim(),       // Texto do comentário (remove espaços extras)
      data: new Date()           // Data atual
    });

    // Salva o comentário no banco de dados
    await comentario.save();

    console.log(`Comentário salvo com sucesso para notícia ${noticiaId} por usuário ${session.user.id}`);
    return NextResponse.json(comentario, { status: 201 }); // Retorna o comentário criado com status 201

  } catch (error) {
    // Log detalhado do erro no servidor
    console.error(`Erro na rota POST /api/comentarios/${noticiaId || '[ID não resolvido]'}:`, error);
    // Retorna um erro genérico para o cliente
    return NextResponse.json({ error: 'Falha ao processar a requisição de postagem' }, { status: 500 });
  }
}