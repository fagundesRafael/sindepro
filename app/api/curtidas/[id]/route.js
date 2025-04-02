// app/api/curtidas/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb'; 
import Curtida from '@/models/Curtida';
// import News from '@/models/News'; // Descomente se for atualizar contador no modelo News

// ***** 1. Importar authOptions *****
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajuste o caminho se necessário

export async function POST(request, { params }) { // params é uma Promise
  let noticiaId; // Para log no catch

  try {
    // ***** 2. Obter sessão CORRETAMENTE *****
    const session = await getServerSession(authOptions);

    // Verifica se está logado
    if (!session || !session.user) {
      console.log(`Tentativa de curtir bloqueada: Usuário não autenticado.`);
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // ***** 3. Verificar se usuário está ATIVO *****
    if (!session.user.isActive) {
       console.log(`Tentativa de curtir bloqueada: Usuário ${session.user.id} INATIVO.`);
       return NextResponse.json({ error: 'Sua conta está inativa. Não é possível curtir.' }, { status: 403 });
    }

    // ***** 4. Obter noticiaId CORRETAMENTE *****
    const resolvedParams = await params;
    noticiaId = resolvedParams.id; // Usa o ID resolvido

    // Verifica ID da notícia
    if (!noticiaId) {
       console.error("ID da notícia não encontrado nos parâmetros resolvidos (curtidas POST):", resolvedParams);
       return NextResponse.json({ error: 'ID da notícia ausente nos parâmetros' }, { status: 400 });
    }

    // Se chegou aqui, usuário está logado, ativo e temos noticiaId.
    const userId = session.user.id; // Pega ID do usuário da sessão CORRETA

    await connectDB(); // Conecta ao DB

    let jaCurtiuAntes = false; // Flag para saber o estado antes da ação

    // Verifica se já existe uma curtida com os campos corretos do Schema
    const curtidaExistente = await Curtida.findOne({
      noticia: noticiaId, // Nome do campo no Schema Curtida
      usuario: userId     // Nome do campo no Schema Curtida
    });

    if (curtidaExistente) {
      // Já curtiu -> Remover a curtida (Descurtir)
      await Curtida.deleteOne({ _id: curtidaExistente._id });
      console.log(`Usuário ${userId} DESCURTIU notícia ${noticiaId}`);
      jaCurtiuAntes = true;
    } else {
      // Não curtiu -> Adicionar a curtida (Curtir)
      await Curtida.create({ // Usando create para simplificar
        noticia: noticiaId,
        usuario: userId
      });
      console.log(`Usuário ${userId} CURTIU notícia ${noticiaId}`);
      jaCurtiuAntes = false;
    }

    // Recalcular o total de curtidas para essa notícia
    const totalCurtidas = await Curtida.countDocuments({ noticia: noticiaId });

    // Opcional: Atualizar um campo 'curtidas' no documento da Notícia
    // await News.findByIdAndUpdate(noticiaId, { $set: { curtidas: totalCurtidas } });
    // (Seu modelo 'News' precisaria ter um campo 'curtidas: Number')

    // Retorna o NOVO estado da curtida (se curtiu ou descurtiu) e o total
    return NextResponse.json({
      curtiu: !jaCurtiuAntes, // O novo estado é o oposto do que era antes
      totalCurtidas
    });

  } catch (error) {
    console.error(`Erro na rota POST /api/curtidas/${noticiaId || '[ID não resolvido]'}:`, error);
    // Retorna erro genérico (o frontend pode tratar a mensagem específica se o status for 403)
    return NextResponse.json({ error: 'Erro ao processar curtida' }, { status: 500 });
  }
}

// Você pode adicionar outros métodos (GET, DELETE) aqui se necessário,
// lembrando de aplicar a lógica 'await params' se eles usarem o ID da rota.