//app/api/auth/register/route.js
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();

    const { nome, matricula, email, senha } = await request.json();

    // Validações
    if (!nome || !matricula || !email || !senha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    const userExists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { matricula }]
    });

    if (userExists) {
      return NextResponse.json(
        { error: 'Email ou matrícula já cadastrados' },
        { status: 400 }
      );
    }

    // Criar usuário - o hash será feito automaticamente pelo middleware do mongoose
    const user = await User.create({
      nome,
      matricula,
      email: email.toLowerCase(),
      senha
    });

    return NextResponse.json(
      { message: 'Usuário criado com sucesso' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
} 