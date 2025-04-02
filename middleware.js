// middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token; // Token DEVE conter id, name, email, isAdmin, isActive diretamente
    const { pathname } = req.nextUrl;

    // Para debug - Verifique as propriedades DIRETAS do token
    console.log('Middleware - Pathname:', pathname);
    console.log('Middleware - Token Recebido:', token); // Veja o que realmente está no token

    // --- Lógica de Proteção para /institucional ---

    // 1. Verifica se está logado (o próprio withAuth pode redirecionar se não configurado `authorized:()=>true`)
    // Mas como usamos authorized: () => true, precisamos verificar o token aqui.
    if (!token) {
      // Se não estiver logado, redireciona para o login
      console.log(`Acesso negado a ${pathname}: Não autenticado.`);
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname); // Opcional: voltar após login
      return NextResponse.redirect(loginUrl);
    }

    // 2. Verifica se está ATIVO (isActive: true) - Obrigatório para TODAS as rotas /institucional
    // Acessa diretamente token.isActive
    if (!token.isActive) {
      console.log(`Acesso negado a ${pathname}: Usuário INATIVO (isActive: ${token.isActive}). Redirecionando para /`);
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }

    // Se chegou aqui, o usuário está LOGADO e ATIVO.

    // 3. Verifica se é a rota do DASHBOARD e se é ADMIN
    if (pathname.startsWith('/institucional/dashboard')) {
      // Acessa diretamente token.isAdmin
      if (!token.isAdmin) {
        console.log(`Acesso negado a ${pathname}: Usuário não é ADMIN (isAdmin: ${token.isAdmin}). Redirecionando para /`);
        const homeUrl = new URL('/', req.url); // Ou para '/institucional' se tiver uma página lá
        return NextResponse.redirect(homeUrl);
      }
      // Se for admin (e já sabemos que está ativo), permite acesso ao dashboard
      console.log(`Acesso PERMITIDO ao DASHBOARD ${pathname} (isAdmin: ${token.isAdmin}, isActive: ${token.isActive})`);
      return NextResponse.next(); // Permite acesso
    }

    // 4. Para OUTRAS rotas /institucional (não dashboard)
    // Se chegou aqui, está logado, está ativo, e não é a rota do dashboard. Permite acesso.
    console.log(`Acesso PERMITIDO a ${pathname} (isActive: ${token.isActive})`);
    return NextResponse.next(); // Permite acesso

  },
  {
    callbacks: {
      // Esta configuração garante que a função middleware acima SEMPRE rode
      // para as rotas no matcher, e nós fazemos a lógica de autorização dentro dela.
      authorized: ({ token }) => true,
    },
  }
);

// Configurar quais rotas o middleware deve proteger
export const config = {
  // Aplica o middleware a todas as rotas começando com /institucional/
  matcher: ['/institucional/:path*'],
};