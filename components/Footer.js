//components/Footer.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    // Removed relative and overflow-hidden unless specifically needed for other styling
    <footer className="bg-gradient-to-r from-red-800 to-red-700 text-white">
      {/* Removed the absolute positioned SVG block as it was empty */}

      <div className="container mx-auto px-4 pt-12 pb-8"> {/* Reduced top padding slightly */}
        {/* Grid de 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Coluna 1 - Logo e Redes Sociais */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4 mb-4">
              <Link href="https://www.facebook.com/profile.php?id=61558114495768" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
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
             {/* Optional: Add Logo here if desired */}
             {/* <Image src="/logos/logo-sindepro-maior.png" alt="Sindepro" width={100} height={50} className="mt-4"/> */}
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
             {/* Use ul for semantic list */}
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2"> {/* Adjusted gap */}
              <li><Link href="/" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Principal</Link></li>
              <li><Link href="/institucional/diretoria" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Diretoria</Link></li>
              <li><Link href="/noticias" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Notícias</Link></li>
              <li><Link href="/institucional/convenios" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Convênios</Link></li>
              <li><Link href="/filiacao" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Afilie-se Já</Link></li>
              <li><Link href="/area-do-afiliado" className="hover:translate-x-1 transition-transform duration-300 hover:text-gray-200 text-sm">Área do Afiliado</Link></li>
            </ul>
          </div>

          {/* Coluna 3 - Endereço */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <address className="not-italic flex flex-col gap-2 text-sm"> {/* Use text-sm */}
              <div className="flex items-center gap-2">
                 {/* Location Icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Av. 7 de Setembro, 4355</span>
              </div>
              <div className="flex items-center gap-2">
                 {/* Building Icon (Example, choose appropriate) */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <span>Jardim das Mangueiras</span>
              </div>
              <div className="flex items-center gap-2">
                 {/* Map Pin Icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Porto Velho - RO</span>
              </div>
              <div className="flex items-center gap-2">
                 {/* Mail Icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>CEP: 76820-322</span>
              </div>
            </address>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-300 opacity-30 my-8"></div> {/* Simplified divider */}

        {/* Copyright */}
        <div className="text-center text-sm opacity-80">
          <p>© Copyright 2014 - {new Date().getFullYear()} Todos os Direitos Reservados ao Sindepro.com.br</p> {/* Dynamic year */}
           {/* Ensure the link is easily clickable and visually distinct */}
          <span className="block mt-2 text-xs text-white opacity-70"> {/* Adjusted style */}
            Criado por: <a href="https://www.instagram.com/rafael.fagundes.9028/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline text-white opacity-100">Rafael Fagundes</a>
          </span>
        </div>
      </div>
    </footer>
  );
}