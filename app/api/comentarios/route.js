//app/api/comentarios/route.js
import connectDB from '@/lib/mongodb';
import Comentario from '@/models/Comentario';

export async function POST(request) {
  try {
    await connectDB();
    const { noticiaId, userId, texto, autorNome } = await request.json();

    const comentario = await Comentario.create({
      noticiaId,
      userId,
      texto,
      autorNome,
      data: new Date(),
    });

    return Response.json(comentario);
  } catch (error) {
    return Response.json({ error: 'Erro ao criar comentário' }, { status: 500 });
  }
} 