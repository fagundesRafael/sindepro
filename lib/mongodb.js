//lib/mongodb.js
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor, defina a variável de ambiente MONGODB_URI dentro de .env.local'
  );
}

/**
 * O objeto global é usado aqui para manter uma conexão em cache
 * entre recarregamentos a quente (hot reloads) no desenvolvimento.
 * Isso evita que as conexões cresçam exponencialmente
 * durante o uso das Rotas de API.
 */
let cached = global.mongoose;

if (!cached) {
  // Se não houver cache, inicializa um novo objeto de cache no global
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Se já temos uma conexão em cache, retorna ela diretamente
  if (cached.conn) {
    // console.log('=> Usando conexão de banco de dados existente do cache'); // Descomente para depurar
    return cached.conn;
  }

  // Se não temos uma *promessa* de conexão em andamento, cria uma nova
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Recomendado: desativa o buffer do Mongoose se a conexão inicial falhar
      // useNewUrlParser e useUnifiedTopology não são mais necessários a partir do Mongoose 6
    };

    // console.log('=> Criando NOVA promessa de conexão de banco de dados'); // Descomente para depurar
    // Armazena a promessa de conexão no cache
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      // console.log('MongoDB Conectado (dentro da promessa .then)'); // Descomente para depurar
      return mongooseInstance; // Retorna a instância do mongoose quando a conexão é bem-sucedida
    });
  }

  // Aguarda a promessa de conexão (existente ou a que acabamos de criar) ser resolvida
  try {
    // console.log('=> Aguardando a promessa de conexão resolver...'); // Descomente para depurar
    cached.conn = await cached.promise;
    // console.log('=> Conexão resolvida e armazenada no cache'); // Descomente para depurar
  } catch (e) {
    // Se a conexão falhar, remove a promessa do cache para permitir uma nova tentativa na próxima chamada
    cached.promise = null;
    console.error('Erro ao conectar ou resolver a promessa do MongoDB:', e);
    throw e; // Propaga o erro para que a API route possa tratá-lo
  }

  // Retorna a conexão estabelecida
  return cached.conn;
}

// --- Seus manipuladores de eventos existentes ---
// (Podem ser mantidos, mas o log de conexão inicial será mais consistente vindo do connectDB)

// Limpei os logs duplicados daqui, pois o `connectDB` agora gerencia o log de sucesso/erro inicial
// mongoose.connection.on('connected', () => {
//   console.log('Evento MongoDB: conectado'); // Renomeado para clareza
// });

mongoose.connection.on('error', (err) => {
  console.error('Evento MongoDB: Erro na conexão:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Evento MongoDB: desconectado');
});

// Exporta apenas a função de conexão aprimorada
export default connectDB;

// Não é mais necessário exportar 'mongoose' diretamente daqui,
// pois a conexão é gerenciada e retornada pelo connectDB.
// Se precisar da instância do mongoose em outro lugar (incomum), importe diretamente 'mongoose'.
// export { mongoose };