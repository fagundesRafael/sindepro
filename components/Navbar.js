//components/Navbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [showInstitucional, setShowInstitucional] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { data: session } = useSession();
  
  // Obtém o primeiro nome do usuário
  const firstName = session?.user?.name?.split(' ')[0] || '';

  // Efeito para alternar entre "Sair" e mensagem de boas-vindas
  useEffect(() => {
    const interval = setInterval(() => {
      setShowWelcome(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  let timeoutId = null;

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShowInstitucional(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowInstitucional(false);
    }, 500);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  // Função para gerar o href correto baseado no status de autenticação
  const getInstitucionalHref = (path) => {
    if (!session) return '/login';
    return `/institucional/${path}`;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logos/logo-sindepro-maior.png"
                alt="Logo Sindepro"
                width={80}
                height={20}
                className="h-20 w-auto"
                style={{ height: "auto" }}
              />
            </Link>
            <div className="flex flex-col ml-2 justify-center items-center">
              <h1 className="text-7xl text-red-700 font-bold">SINDEPRO</h1>
              <p className="text-[10px]">SINDICATO DOS DELEGADOS DE POLÍCIA CIVIL DO ESTADO DE RONDÔNIA</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-800 hover:text-red-700 font-medium relative group">
              <span>Início</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>

            <Link href="/noticias" className="text-gray-800 hover:text-red-700 font-medium relative group">
              <span>Notícias</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>

            {/* Menu Institucional - agora visível para todos */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-800 hover:text-red-700 font-medium flex items-center gap-1 relative group">
                <span>Institucional</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${showInstitucional ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </button>

              <div 
                className={`absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 transition-all duration-500 transform ${
                  showInstitucional 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Dashboard - apenas para admin */}
                {session?.user?.isAdmin && (
                  <Link 
                    href="/institucional/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                )}
                
                {/* Outras opções do menu institucional */}
                <Link 
                  href={getInstitucionalHref('diretoria')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Diretoria
                </Link>
                <Link 
                  href={getInstitucionalHref('galeria')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Galeria
                </Link>
                <Link 
                  href={getInstitucionalHref('convenios')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Convênios
                </Link>
                <Link 
                  href={getInstitucionalHref('eventos')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Eventos
                </Link>
                <Link 
                  href={getInstitucionalHref('contatos')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Contatos
                </Link>
              </div>
            </div>

            <Link href="/filiacao" className="text-red-600 hover:text-red-800 font-medium relative group">
              <span>Filie-se</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>

            {session ? (
              <button
                onClick={handleLogout}
                onMouseEnter={() => setShowWelcome(false)}
                onMouseLeave={() => setShowWelcome(true)}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 w-[160px] h-[48px] relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`absolute w-full transition-all duration-500 ease-in-out ${
                      showWelcome 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-full'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-[9px]">Seja bem vindo(a):</div>
                      <div className="text-[10px]">Dr(a) {firstName}</div>
                    </div>
                  </div>

                  <div
                    className={`absolute w-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                      showWelcome 
                        ? 'opacity-0 -translate-y-full' 
                        : 'opacity-100 translate-y-0'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>Sair</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center gap-2"
              >
                <span>Entrar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"
                  />
                </svg>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button className="text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 