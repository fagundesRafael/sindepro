//app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        senha: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          if (!user) return null;

          const senhaCorreta = await bcrypt.compare(credentials.senha, user.senha);
          if (!senhaCorreta) return null;

          // Retorna o objeto USER para o callback JWT (SÓ no login)
          return {
            id: user._id.toString(), // Garante que o ID é string
            name: user.nome,
            email: user.email,
            matricula: user.matricula,
            isAdmin: user.isAdmin,
            isActive: user.isActive
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 'user' só está presente no PRIMEIRO login.
      // Adicione as propriedades do usuário DIRETAMENTE ao token.
      if (user) {
        token.id = user.id;           // <<< CORRIGIDO: Pega o 'id' (string) do objeto user
        token.name = user.name;       // Pega o 'name' do objeto user
        token.email = user.email;     // Pega o 'email' do objeto user
        token.isAdmin = user.isAdmin; // Pega 'isAdmin' do objeto user
        token.isActive = user.isActive; // Pega 'isActive' do objeto user
        token.matricula = user.matricula; // Adiciona matrícula também, se precisar
      }
      // Retorna o token (com as novas propriedades, se foi login inicial)
      return token;
    },
    async session({ session, token }) {
      // 'token' aqui é o resultado do callback jwt.
      // Copie as propriedades do token para session.user.
      // Garanta que session.user exista (NextAuth geralmente cria)
      if (session.user) {
          session.user.id = token.id;           // <<< REMOVIDO 'as string'
          session.user.name = token.name;       // <<< REMOVIDO 'as string'
          session.user.email = token.email;     // <<< REMOVIDO 'as string'
          // Adicione outros campos que você colocou no token e quer na sessão
          // A atribuição direta geralmente funciona em JS, mesmo que a propriedade não exista antes.
          // Se tiver problemas com as propriedades abaixo não existindo no session.user padrão,
          // você pode precisar reconstruir o objeto session.user, mas tente a atribuição direta primeiro.
          session.user.isAdmin = token.isAdmin;   // <<< REMOVIDO 'as boolean' / 'as any'
          session.user.isActive = token.isActive; // <<< REMOVIDO 'as boolean' / 'as any'
          session.user.matricula = token.matricula; // <<< REMOVIDO 'as string' / 'as any'
      }
      // Retorna a sessão modificada, agora com o ID e outros dados
      return session;
    },
  },
  session: {
    strategy: "jwt", // Importante: Confirma que você está usando JWT
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };