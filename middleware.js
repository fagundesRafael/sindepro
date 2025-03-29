import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isInstitucionalPath = req.nextUrl.pathname.startsWith('/institucional');
    const isDashboardPath = req.nextUrl.pathname === '/institucional/dashboard';

    // Para debug - remova em produção
    console.log('Token:', token);
    console.log('Is Admin:', token?.user?.isAdmin);
    console.log('Current Path:', req.nextUrl.pathname);

    // Rota do dashboard
    if (isDashboardPath) {
      // Verifica explicitamente se isAdmin é true
      if (token?.user?.isAdmin === true) {
        return NextResponse.next();
      }
      // Se não for admin, redireciona para home
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Outras rotas institucionais
    if (isInstitucionalPath) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Permite que o middleware seja executado para verificações personalizadas
        return true;
      },
    },
  }
);

// Configurar quais rotas o middleware deve proteger
export const config = {
  matcher: ['/institucional/:path*']
}; 