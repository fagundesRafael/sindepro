//app/api/curtidas/route.js
import connectDB from '@/lib/mongodb';
import Curtida from '@/models/Curtida';
import Noticia from '@/models/News';

export async function POST(request) {
  try {
    await connectDB();
    const { noticiaId, userId } = await request.json();

    // Verificar se já existe curtida
    const curtidaExistente = await Curtida.findOne({ noticiaId, userId });
    if (curtidaExistente) {
      return Response.json({ message: 'Notícia já foi curtida' }, { status: 400 });
    }

    // Criar nova curtida
    await Curtida.create({ noticiaId, userId });

    // Atualizar contador de curtidas na notícia
    const totalCurtidas = await Curtida.countDocuments({ noticiaId });
    await Noticia.findByIdAndUpdate(noticiaId, { curtidas: totalCurtidas });

    return Response.json({ totalCurtidas });
  } catch (error) {
    return Response.json({ error: 'Erro ao processar curtida' }, { status: 500 });
  }
} 