// app/api/curtidas/[id]/route.js  <-- ROTA CORRETA PARA POST (TOGGLE)
import connectDB from '@/lib/mongodb';
import Curtida from '@/models/Curtida';
import Noticia from '@/models/News';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from "next-auth/next";

// Handler GET para esta rota (se precisar de algo aqui, como buscar a notícia)
// export async function GET(request, { params }) { ... }

// Handler POST para curtir/descurtir
export async function POST(request, { params }) {
    const { id: noticiaId } = params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    const userId = session.user.id;

    if (!session.user.isActive) {
        return NextResponse.json({ error: 'Conta inativa, não pode curtir ou descurtir.' }, { status: 403 });
    }

    if (!noticiaId || !mongoose.Types.ObjectId.isValid(noticiaId)) {
        return NextResponse.json({ error: 'ID da notícia inválido' }, { status: 400 });
    }

    try {
        await connectDB();
        const curtidaExistente = await Curtida.findOne({ noticiaId: noticiaId, userId: userId });
        let curtiu = false;

        if (curtidaExistente) {
            await Curtida.findByIdAndDelete(curtidaExistente._id);
            curtiu = false;
        } else {
            await Curtida.create({ noticiaId: noticiaId, userId: userId });
            curtiu = true;
        }

        const totalCurtidas = await Curtida.countDocuments({ noticiaId: noticiaId });
        await Noticia.findByIdAndUpdate(noticiaId, { curtidas: totalCurtidas });

        return NextResponse.json({ totalCurtidas, curtiu }); // Retorna estado atualizado

    } catch (error) {
        console.error(`Erro POST /api/curtidas/${noticiaId}:`, error);
        return NextResponse.json({ error: 'Erro interno ao processar a curtida' }, { status: 500 });
    }
}