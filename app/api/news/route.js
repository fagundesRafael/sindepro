//app/api/news/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import mongoose from 'mongoose'; 

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        if (!data.titulo || !data.descricao || !data.categoria || !data.data) {
            return NextResponse.json({ error: 'Campos obrigatórios ausentes (titulo, descricao, categoria, data)' }, { status: 400 });
        }
        if (typeof data.data === 'string') {
           data.data = new Date(data.data);
           if (isNaN(data.data.getTime())) {
                return NextResponse.json({ error: 'Formato de data inválido' }, { status: 400 });
           }
        } else if (!(data.data instanceof Date)) {
             data.data = new Date(); 
        }

        const news = await News.create(data);
        return NextResponse.json(news, { status: 201 });
    } catch (error) {
        console.error("API Error creating news:", error);
        return NextResponse.json({ error: 'Erro ao criar notícia', details: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const idsParam = searchParams.get('ids'); 

        if (idsParam) {
            const idsArray = idsParam
                .split(',')
                .map(id => id.trim()) 
                .filter(id => mongoose.Types.ObjectId.isValid(id)); 

            if (idsArray.length > 0) {
                const news = await News.find({
                    '_id': { $in: idsArray }
                }).sort({ data: -1 }); 

                return NextResponse.json(news);
            } else {
                return NextResponse.json([]);
            }
        }

        const page = parseInt(searchParams.get('page')) || 1;
        const titulo = searchParams.get('titulo') || '';
        const descricao = searchParams.get('descricao') || '';
        const categoria = searchParams.get('categoria') || '';
        const autor = searchParams.get('autor') || '';

        const query = {};
        if (titulo) query.titulo = { $regex: titulo, $options: 'i' }; 
        if (descricao) query.descricao = { $regex: descricao, $options: 'i' };
        if (categoria && categoria !== 'todas') query.categoria = categoria; 
        if (autor) query.autor = autor; 

        const limit = parseInt(searchParams.get('limit')) || 16; 
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
        console.error("API Error fetching news:", error);
        return NextResponse.json({ error: 'Erro ao buscar notícias', details: error.message }, { status: 500 });
    }
}