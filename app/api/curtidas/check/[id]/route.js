//app/api/curtidas/check/[id]/route.js
import { connectDB } from '@/lib/mongodb';
import Curtida from '@/models/Curtida';
// Usando NextResponse para manter a consistência com suas outras rotas
import { NextResponse } from 'next/server';

export async function GET(request, { params }) { // params aqui também é uma Promise
  let noticiaId; // Declarar fora para log no catch

  try {
    // ***** SOLUÇÃO: Faça o await da Promise 'params' *****
    const resolvedParams = await params;
    noticiaId = resolvedParams.id; // Acesse .id do objeto RESOLVIDO

    // Verificação: O ID da notícia existe?
    if (!noticiaId) {
        console.error("ID da notícia não encontrado nos parâmetros resolvidos (curtidas/check):", resolvedParams);
        // Usando NextResponse
        return NextResponse.json({ error: 'ID da notícia ausente nos parâmetros' }, { status: 400 });
    }

    // connectDB pode vir depois de resolver params
    await connectDB();

    // Obtenha o userId dos parâmetros da URL (?userId=...)
    const userId = request.nextUrl.searchParams.get('userId');

    // Verificação: O ID do usuário existe?
    if (!userId) {
         console.error("ID do usuário não encontrado nos searchParams (curtidas/check)");
         // Usando NextResponse
         return NextResponse.json({ error: 'ID do usuário ausente nos parâmetros da query' }, { status: 400 });
    }

    // Use o noticiaId resolvido
    const curtida = await Curtida.findOne({ noticiaId: noticiaId, userId: userId });

    // Usando NextResponse
    return NextResponse.json({ jaCurtiu: !!curtida });

  } catch (error) {
    console.error(`Erro ao verificar curtida para notícia ${noticiaId || '[ID não resolvido]'}:`, error);
    // Usando NextResponse
    return NextResponse.json({ error: 'Erro ao verificar curtida' }, { status: 500 });
  }
}