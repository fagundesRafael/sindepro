// app/api/curtidas/check/[id]/route.js <-- ROTA CORRETA PARA GET (VERIFICAR)
import connectDB from '@/lib/mongodb'; // Corrigido: importar função diretamente
import Curtida from '@/models/Curtida';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
// Você pode precisar da sessão aqui também se quiser validar o userId vindo da query
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { getServerSession } from "next-auth/next";

export async function GET(request, { params }) {
  const { id: noticiaId } = params;
  // Obter userId da query string (como enviado pelo frontend)
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  // 1. Validar IDs
  if (!noticiaId || !mongoose.Types.ObjectId.isValid(noticiaId)) {
    return NextResponse.json({ error: 'ID da notícia inválido' }, { status: 400 });
  }
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: 'ID do usuário inválido ou ausente na query' }, { status: 400 });
  }

  // // Opcional: Verificar sessão no backend (mais seguro se quiser garantir que o userId da query pertence ao logado)
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.id !== userId) {
  //     return NextResponse.json({ error: 'Não autorizado a verificar para este usuário' }, { status: 401 });
  // }

  try {
    await connectDB();

    // 2. Verificar se a curtida existe
    const curtidaExistente = await Curtida.findOne({
        noticiaId: noticiaId,
        userId: userId
    });

    // 3. Retornar o resultado esperado pelo frontend
    return NextResponse.json({ jaCurtiu: !!curtidaExistente }); // !! converte para boolean

  } catch (error) {
    console.error(`Erro ao verificar curtida para notícia ${noticiaId} e usuário ${userId}:`, error);
    return NextResponse.json({ error: 'Erro interno ao verificar a curtida' }, { status: 500 });
  }
}

// REMOVA A FUNÇÃO POST DESTE ARQUIVO, POIS ELA DEVE ESTAR EM /api/curtidas/[id]/route.js