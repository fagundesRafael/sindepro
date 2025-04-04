//components/Footer.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-800 to-red-700 text-white relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Grid de 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Coluna 1 - Logo e Redes Sociais */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4 mb-4">
              <Link href="https://www.facebook.com/profile.php?id=100008384590495" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logos/logo-facebook.png" 
                  alt="Facebook" 
                  width={32} 
                  height={32}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link href="https://www.instagram.com/sindeprooficial/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logos/logo-instagram.png" 
                  alt="Instagram" 
                  width={32} 
                  height={32}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logos/logo-whatsapp.png" 
                  alt="WhatsApp" 
                  width={32} 
                  height={32}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Principal
              </Link>
              <Link href="/diretoria" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Diretoria
              </Link>
              <Link href="/sobre-nos" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Sobre Nós
              </Link>
              <Link href="/convenios" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Convênios
              </Link>
              <Link href="/afilie-se-ja" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Afilie-se Já
              </Link>
              <Link href="/area-do-afiliado" className="hover:translate-x-2 transition-transform duration-300 hover:text-gray-200">
                Área do Afiliado
              </Link>
            </div>
          </div>

          {/* Coluna 3 - Endereço */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <address className="not-italic flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Av. 7 de Setembro, 4355</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span>Jardim das Mangueiras</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>Porto Velho - RO</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>CEP: 76820-322</span>
              </div>
            </address>
          </div>
        </div>

        {/* Linha divisória com gradiente */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 opacity-30"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-80">
          <p>©Copyright 2014 - Todos os Direitos Reservados ao Sindepro.com.br</p>
        </div>
      </div>
    </footer>
  );
} 