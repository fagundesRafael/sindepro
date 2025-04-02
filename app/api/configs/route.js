//app/api/configs/route.js
import { connectDB } from '@/lib/mongodb';
import Config from '@/models/Config';

export async function GET() {
  try {
    await connectDB();
    // Busca a primeira (e única) configuração
    const config = await Config.findOne({}) || {};
    return Response.json(config);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Busca configuração existente ou cria uma nova
    const config = await Config.findOne({});
    if (config) {
      // Atualiza configuração existente
      Object.assign(config, data);
      await config.save();
    } else {
      // Cria nova configuração
      await Config.create(data);
    }
    
    return Response.json({ message: 'Configurações salvas com sucesso' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 