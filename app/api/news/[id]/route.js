//app/api/news/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedNews = await News.findByIdAndDelete(id);
    
    if (!deletedNews) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Notícia deletada com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar notícia' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const news = await News.findById(id);
    if (!news) {
      return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!updatedNews) {
      return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 });
    }

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 