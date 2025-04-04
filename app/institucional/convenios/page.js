//app/institucional/convenios/page.js
"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import OfflineNotice from '@/components/OfflineNotice';

export default function Convenios() {
  // Array de convênios
  const convenios = [
    { id: 1, nome: "Colégio Cristão", imagem: "https://source.unsplash.com/random/300x200?school" },
    { id: 2, nome: "DYNAMUS", imagem: "https://source.unsplash.com/random/300x200?fitness" },
    { id: 3, nome: "Faculdade São Lucas", imagem: "https://source.unsplash.com/random/300x200?university" },
    { id: 4, nome: "Faro", imagem: "https://source.unsplash.com/random/300x200?college" },
    { id: 5, nome: "Fatec", imagem: "https://source.unsplash.com/random/300x200?technology" },
    { id: 6, nome: "Ulbra", imagem: "https://source.unsplash.com/random/300x200?education" },
    { id: 7, nome: "Unimed", imagem: "https://source.unsplash.com/random/300x200?health" },
    { id: 8, nome: "Uniodonto", imagem: "https://source.unsplash.com/random/300x200?dental" },
    { id: 9, nome: "Unipec", imagem: "https://source.unsplash.com/random/300x200?institute" },
    { id: 10, nome: "Uniron", imagem: "https://source.unsplash.com/random/300x200?academy" }
  ];

    return (
    <div className="min-h-screen flex flex-col">
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>
      
      <main className="flex-grow mx-[10%] py-8">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da página */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">CONVÊNIOS SINDEPRO</h1>
          
          {/* Descrição */}
          <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
            O SINDEPRO tem orgulho de oferecer aos seus associados parcerias exclusivas 
            com diversas instituições de qualidade. Conheça nossos convênios abaixo.
          </p>
          
          {/* Grid de convênios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {convenios.map((convenio) => (
              <Link 
                key={convenio.id} 
                href="/"
                className="transition-all duration-300 hover:scale-105 group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image 
                      src={convenio.imagem}
                      alt={`Logo ${convenio.nome}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-110"
                      unoptimized={true}
                    />
                    {/* Overlay no hover */}
                    <div className="absolute inset-0 bg-red-700 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors duration-300">{convenio.nome}</h2>
                    <p className="text-xs text-gray-500 mt-2 group-hover:text-red-600 transition-colors duration-300">Clique para mais informações</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <div className="-mx-[10%]">
        <Footer />
      </div>
      <OfflineNotice />
      </div>
    );
  }