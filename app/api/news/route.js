import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const news = await News.create(data);
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const titulo = searchParams.get('titulo') || '';
    const descricao = searchParams.get('descricao') || '';
    const categoria = searchParams.get('categoria') || '';
    const autor = searchParams.get('autor') || '';

    const query = {};
    if (titulo) query.titulo = { $regex: titulo, $options: 'i' };
    if (descricao) query.descricao = { $regex: descricao, $options: 'i' };
    if (categoria) query.categoria = categoria;
    if (autor) query.autor = autor;

    const limit = 16;
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find(query).sort({ data: -1 }).skip(skip).limit(limit),
      News.countDocuments(query)
    ]);

    return NextResponse.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 