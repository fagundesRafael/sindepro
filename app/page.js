//app/page.js
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialBar from "../components/SocialBar";
import NewsCarousel from "../components/NewsCarousel";

export default function Home() {
  // Dados simulados para notícias
  const noticias = [
    {
      id: 1,
      titulo: "Sindepro realiza assembleia para discutir melhorias na carreira",
      resumo: "Encontro contou com a presença de diversos delegados e autoridades do estado",
      imagem: "/general/no-image.jpg",
    },
    {
      id: 2,
      titulo: "Curso de capacitação para delegados será realizado em agosto",
      resumo: "Inscrições já estão abertas para associados do Sindepro",
      imagem: "/general/no-image.jpg",
    },
    {
      id: 3,
      titulo: "Sindepro participa de reunião com secretário de segurança pública",
      resumo: "Foram discutidas pautas importantes para a categoria",
      imagem: "/general/no-image.jpg",
    },
    {
      id: 4,
      titulo: "Conquista: aprovado projeto que beneficia delegados aposentados",
      resumo: "Sindepro comemora vitória após anos de luta pela categoria",
      data: "10/05/2023",
      hora: "11:20",
      autor: "Pedro Almeida",
      imagem: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      titulo: "Nova sede do Sindepro será inaugurada no próximo mês",
      resumo: "Espaço contará com infraestrutura moderna para melhor atender os associados",
      data: "02/05/2023",
      hora: "09:15",
      autor: "Ana Souza",
      imagem: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  // Dados simulados para eventos
  const eventos = [
    {
      id: 1,
      titulo: "Confraternização anual do Sindepro",
      data: "15/12/2023",
      imagem: "/general/no-image.jpg",
    },
    {
      id: 2,
      titulo: "Seminário sobre segurança pública",
      data: "22/09/2023",
      imagem: "/general/no-image.jpg",
    },
  ];

  // Dados para os cards laterais (agora 4 cards)
  const cardsNoticias = [
    {
      id: 3,
      titulo: "Conquista: aprovado projeto que beneficia delegados aposentados",
      resumo: "Sindepro comemora vitória após anos de luta pela categoria",
      data: "10/05/2023",
      hora: "11:20",
      autor: "Pedro Almeida",
      imagem: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    },
    {
      id: 4,
      titulo: "Nova sede do Sindepro será inaugurada no próximo mês",
      resumo: "Espaço contará com infraestrutura moderna para melhor atender os associados",
      data: "02/05/2023",
      hora: "09:15",
      autor: "Ana Souza",
      imagem: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
    },
    {
      id: 5,
      titulo: "Delegados participam de congresso internacional",
      resumo: "Representantes do Sindepro levam experiências para debate global",
      data: "15/04/2023",
      hora: "14:30",
      autor: "Carlos Silva",
      imagem: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    },
    {
      id: 6,
      titulo: "Novo convênio traz benefícios exclusivos",
      resumo: "Parceria garante vantagens especiais para associados",
      data: "01/04/2023",
      hora: "10:45",
      autor: "Maria Santos",
      imagem: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior com redes sociais */}
      <SocialBar />

      {/* Navbar */}
      <Navbar />

      {/* Banner principal com carrossel e cards laterais */}
      <div className="py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Carrossel ocupando 60% do espaço */}
            <div className="w-full lg:w-[60%] h-[calc(2*152px+1rem)]">
              <div className="relative h-full rounded-lg overflow-hidden">
                <NewsCarousel />
              </div>
            </div>
            
            {/* Cards de notícias ocupando 40% do espaço em duas colunas */}
            <div className="w-full lg:w-[40%] grid grid-cols-2 gap-4">
              {cardsNoticias.map((noticia, index) => (
                <div 
                  key={noticia.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden h-[152px]"
                >
                  <div className="relative h-16">
                    <Image 
                      src={noticia.imagem} 
                      alt={noticia.titulo} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="p-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                      <span>{noticia.data}</span>
                      <span>{noticia.hora}</span>
                    </div>
                    <h3 className="font-bold text-xs mb-1 text-gray-800 hover:text-red-700 line-clamp-2">
                      <Link href={`/noticias/${noticia.id}`}>{noticia.titulo}</Link>
                    </h3>
                    <p className="text-gray-600 text-[10px] line-clamp-1">{noticia.resumo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Seção de notícias em destaque */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Notícias em Destaque</h2>
              <Link href="/noticias" className="text-red-700 hover:underline">Ver todas</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {noticias.slice(0, 4).map((noticia) => (
                <div key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={noticia.imagem} 
                      alt={noticia.titulo} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-red-700">
                      <Link href={`/noticias/${noticia.id}`}>{noticia.titulo}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm">{noticia.resumo}</p>
                    <Link href={`/noticias/${noticia.id}`} className="mt-3 inline-block text-red-700 hover:underline text-sm">
                      Leia mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção de área restrita */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Área Restrita <span className="text-red-700">(somente afiliados)</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card Institucional - Imagem de reunião */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                <div className="relative h-48">
                  <Image 
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Área Institucional" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{objectFit: "cover"}}
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">Institucional</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">Acesse documentos e informações institucionais do Sindepro.</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link href="/institucional" className="text-red-700 hover:underline text-sm">
                      Acessar
                    </Link>
                    <div className="group-hover:animate-shake group-hover:scale-125 transition-all duration-300">
        <Image
                        src="/general/padlock.png" 
                        alt="Acesso restrito" 
                        width={20} 
                        height={20} 
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">Somente afiliados</div>
                </div>
              </div>
              
              {/* Card Galeria - Imagem de família */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                <div className="relative h-48">
                  <Image 
                    src="https://images.pexels.com/photos/3893650/pexels-photo-3893650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Galeria de Fotos" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{objectFit: "cover"}}
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">Galeria</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">Acesse fotos e vídeos de eventos e atividades do Sindepro.</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link href="/galeria" className="text-red-700 hover:underline text-sm">
                      Acessar
                    </Link>
                    <div className="group-hover:animate-shake group-hover:scale-125 transition-all duration-300">
            <Image
                        src="/general/padlock.png" 
                        alt="Acesso restrito" 
              width={20}
              height={20}
            />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">Somente afiliados</div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção de eventos */}
          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Próximos Eventos</h2>
              <Link href="/eventos" className="text-red-700 hover:underline">Ver todos</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventos.map((evento) => (
                <div key={evento.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                  <div className="relative w-1/3">
                    <Image 
                      src={evento.imagem} 
                      alt={evento.titulo} 
                      fill 
                      sizes="(max-width: 768px) 33vw, 16vw"
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <div className="text-red-700 font-medium mb-1">{evento.data}</div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-red-700">
                      <Link href={`/eventos/${evento.id}`}>{evento.titulo}</Link>
                    </h3>
                    <Link href={`/eventos/${evento.id}`} className="mt-2 inline-block text-red-700 hover:underline text-sm">
                      Saiba mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}