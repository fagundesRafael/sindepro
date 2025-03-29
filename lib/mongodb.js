//lib/mongodb.js
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI não encontrada nas variáveis de ambiente');
}

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('MongoDB já está conectado');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
  }
};

// Opcional: Manipuladores de eventos de conexão
mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
});

// Exporta a função de conexão e a instância do mongoose
export { mongoose }; 