//app/api/filiacao/solicitar/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';

// Configurar o transporter do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { nome, email } = await request.json();

    // Caminho para o arquivo do formulário
    const formularioPath = path.join(process.cwd(), 'public', 'general', 'formulario_de_filiacao.png');
    
    // Lê o arquivo
    const formulario = await fs.readFile(formularioPath);

    // Configuração do email
    const mailOptions = {
      from: `"SINDEPRO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Formulário de Filiação - SINDEPRO',
      html: `
        <h1>Olá ${nome},</h1>
        <p>Obrigado por seu interesse em se filiar ao SINDEPRO.</p>
        <p>Em anexo, você encontrará o formulário de filiação.</p>
        <p>Por favor, siga as instruções abaixo:</p>
        <ol>
          <li>Preencha todos os campos do formulário</li>
          <li>Junte os seguintes documentos:</li>
          <ul>
            <li>Cópia do RG (ou CNH)</li>
            <li>Cópia do Documento Funcional</li>
          </ul>
          <li>Envie o formulário preenchido e os documentos para ${process.env.EMAIL_SINDEPRO}</li>
        </ol>
        <p>Atenciosamente,</p>
        <p>Equipe SINDEPRO</p>
      `,
      attachments: [
        {
          filename: 'formulario_de_filiacao.png',
          content: formulario,
        }
      ]
    };

    // Envia o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true,
      message: 'Formulário enviado com sucesso' 
    });

  } catch (error) {
    console.error('Erro ao processar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
} 