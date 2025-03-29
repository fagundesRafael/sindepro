//components/Footer.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white py-8 relative">
      {/* Redes Sociais - Posição fixa no canto superior */}
      <div className="absolute top-4 right-4 flex gap-4">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/logos/logo-facebook.png" 
            alt="Facebook" 
            width={32} 
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/logos/logo-instagram.png" 
            alt="Instagram" 
            width={32} 
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/logos/logo-whatsapp.png" 
            alt="WhatsApp" 
            width={32} 
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Logos institucionais no topo */}
        <div className="flex justify-center gap-8 mb-8">
          <Image 
            src="/logos/logo-pcro.png" 
            alt="Logo PCRO" 
            width={100} 
            height={50}
          />
          <Image 
            src="/logos/logo-adepol.png" 
            alt="Logo ADEPOL" 
            width={100} 
            height={50}
          />
        </div>
        

        {/* Links em linha */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="/" className="text-sm relative group">
            <span className="hover:text-gray-200">Principal</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/diretoria" className="text-sm relative group">
            <span className="hover:text-gray-200">Diretoria</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/sobre-nos" className="text-sm relative group">
            <span className="hover:text-gray-200">Sobre Nós</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/convenios" className="text-sm relative group">
            <span className="hover:text-gray-200">Convênios</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/afilie-se-ja" className="text-sm relative group">
            <span className="hover:text-gray-200">Afilie-se Já</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/area-do-afiliado" className="text-sm relative group">
            <span className="hover:text-gray-200">Área do Afiliado</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link href="/fale-conosco" className="text-sm relative group">
            <span className="hover:text-gray-200">Fale Conosco</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        </div>

       

        {/* Informações de endereço e copyright em linha */}
        <div className="flex flex-wrap justify-center gap-4 text-sm border-t border-red-600 pt-4 w-full">
          <p>Av. 7 de Setembro, 4355</p>
          <p>•</p>
          <p>Jardim das Mangueiras</p>
          <p>•</p>
          <p>Porto Velho - RO</p>
          <p>•</p>
          <p>CEP: 76820-322</p>
          <p>•</p>
        </div>
          <p>©Copyright 2014 - Todos os Direitos Reservados ao Sindepro.com.br</p>
      </div>
    </footer>
  );
} 