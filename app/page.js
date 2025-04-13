// app/page.js
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialBar from "../components/SocialBar";
import NewsCarousel from "../components/NewsCarousel";

async function fetchNewsByIds(ids) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; 
  const newsPromises = ids
    .filter(Boolean) // Garante que não há IDs nulos/undefined
    .map(
      (id) =>
        fetch(`${baseUrl}/api/news/${id}`, { cache: "no-store" }) 
          .then((res) => (res.ok ? res.json() : null)) 
          .catch(() => null) 
    );
  const results = await Promise.all(newsPromises);
  return results.filter(Boolean); 
}

// Função auxiliar para formatar dados do card (pode ser movida para utils)
function formatCardData(news) {
  return news
    ? {
        id: news._id,
        titulo: news.titulo,
        resumo: news.descricao,
        imagem: news.imagem || "/general/no-image.jpg",
        data: news.data
          ? new Date(news.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })
          : "", // Adiciona timeZone se necessário
        hora: news.data
          ? new Date(news.data).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC", // Adiciona timeZone se necessário
            })
          : "",
      }
    : {
        id: null,
        titulo: "Informe uma notícia",
        resumo: "Informe uma notícia",
        imagem: "/general/no-image.jpg",
        data: "",
        hora: "",
      };
}

function formatSlideData(news) {
  return news
    ? {
        id: news._id,
        titulo: news.titulo,
        texto: news.descricao, 
        imagem: news.imagem || "/general/no-image.jpg",
        data: news.data
          ? new Date(news.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })
          : "",
        hora: news.data
          ? new Date(news.data).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })
          : "",
        autor: news.autor,
      }
    : null; 
}

export default async function Home() {
  let configData = {};
  let cardNewsData = [];
  let destaqueNewsData = [];
  let eventoNewsData = [];
  let slideNewsData = []; // Dados para o carrossel

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Use variável de ambiente

    const configResponse = await fetch(`${baseUrl}/api/configs`, {
      cache: "no-store",
    }); 
    if (configResponse.ok) {
      configData = await configResponse.json();
    } else {
      console.error("Falha ao buscar configurações:", configResponse.status);
    }

    const cardIds = ["C1", "C2", "C3", "C4"]
      .map((key) => configData?.[key])
      .filter(Boolean);
    const destaqueIds = ["D1", "D2", "D3", "D4"]
      .map((key) => configData?.[key])
      .filter(Boolean);
    const eventoIds = ["E1", "E2"]
      .map((key) => configData?.[key])
      .filter(Boolean);
    const slideIds = ["S1", "S2", "S3"]
      .map((key) => configData?.[key])
      .filter(Boolean); 

    const allNewsIds = [
      ...new Set([...cardIds, ...destaqueIds, ...eventoIds, ...slideIds]),
    ]; 
    const allNews = await fetchNewsByIds(allNewsIds);

    const newsMap = new Map(allNews.map((news) => [news._id.toString(), news]));

    cardNewsData = cardIds.map((id) => newsMap.get(id));
    destaqueNewsData = destaqueIds.map((id) => newsMap.get(id)).filter(Boolean);
    eventoNewsData = eventoIds.map((id) => newsMap.get(id)).filter(Boolean);
    slideNewsData = slideIds.map((id) => newsMap.get(id)).filter(Boolean); 
  } catch (error) {
    console.error(
      "Erro ao buscar dados na Home Page (Server Component):",
      error
    );
  }

  const processedCards = Array(4)
    .fill(null)
    .map((_, index) => {
      const news = cardNewsData[index]; 
      return formatCardData(news); 
    });

  // Formatar slides para o carrossel
  const formattedSlides = slideNewsData.map(formatSlideData).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>

      <div className="py-6 bg-gray-100 mx-[10%] rounded mt-4 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[60%] h-[calc(2*152px+1rem)]">
              <NewsCarousel initialSlides={formattedSlides} />
            </div>

            <div className="w-full lg:w-[40%] grid grid-cols-2 gap-4">
              {processedCards.map(
                (
                  noticia,
                  index 
                ) => (
                  <div
                    key={`card-section-${noticia.id || index}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden h-[152px]"
                  >
                    <div className="relative h-16">
                      <Image
                        src={noticia.imagem}
                        alt={noticia.titulo || "Imagem da notícia"}
                        fill
                        sizes="(max-width: 1024px) 20vw, 15vw" 
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />
                    </div>
                    <div className="p-2">
                      {noticia.id ? (
                        <>
                          <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                            <span>{noticia.data}</span>
                            <span>{noticia.hora}</span>
                          </div>
                          <h3 className="font-bold text-xs mb-1 text-gray-800 hover:text-red-700 line-clamp-2">
                            <Link href={`/noticias/${noticia.id}`}>
                              {noticia.titulo}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-[10px] line-clamp-1">
                            {noticia.resumo}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-bold text-xs mb-1 text-gray-400">
                            {noticia.titulo}
                          </h3>
                          <p className="text-gray-400 text-[10px]">
                            {noticia.resumo}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow mx-[10%]">
        <div className="container mx-auto px-4 py-12 bg-white">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Notícias em Destaque
              </h2>
              <Link href="/noticias" className="text-red-700 hover:underline">
                Ver todas
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destaqueNewsData.map((noticia, index) => (
                <div
                  key={`destaque-section-${noticia._id}-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={noticia.imagem || "/general/no-image.jpg"}
                      alt={noticia.titulo || "Imagem da notícia em destaque"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-0 left-0 bg-red-700 text-white px-2 py-1 text-sm">
                      {noticia.categoria}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col h-[200px]">
                    {" "}
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-red-700 line-clamp-2">
                      <Link href={`/noticias/${noticia._id}`}>
                        {noticia.titulo}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {noticia.descricao}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-col gap-2 mb-2">
                        <div
                          key={`destaque-author-${noticia._id}-${index}`}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />{" "}
                          </svg>
                          <span className="text-xs">{noticia.autor}</span>
                        </div>
                        <div
                          key={`destaque-date-${noticia._id}-${index}`}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />{" "}
                          </svg>
                          <span className="text-xs">
                            {noticia.data
                              ? new Date(noticia.data).toLocaleDateString(
                                  "pt-BR",
                                  { timeZone: "UTC" }
                                )
                              : ""}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/noticias/${noticia._id}`}
                        className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center"
                      >
                        Leia mais
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />{" "}
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Área Restrita{" "}
              <span className="text-red-700">(somente afiliados)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                <div className="relative h-48">
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Imagem representativa da área institucional"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    {" "}
                    <h3 className="text-white text-2xl font-bold">
                      Institucional
                    </h3>{" "}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">
                    Acesse documentos e informações institucionais do Sindepro.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href="/institucional"
                      className="text-red-700 hover:underline text-sm"
                    >
                      {" "}
                      Acessar{" "}
                    </Link>
                    <div className="group-hover:animate-shake group-hover:scale-125 transition-all duration-300">
                      {" "}
                      <Image
                        src="/general/padlock.png"
                        alt="Acesso restrito"
                        width={20}
                        height={20}
                      />{" "}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">
                    Somente afiliados
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                <div className="relative h-48">
                  <Image
                    src="https://images.pexels.com/photos/3893650/pexels-photo-3893650.jpeg"
                    alt="Imagem representativa da galeria de fotos"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    {" "}
                    <h3 className="text-white text-2xl font-bold">
                      Galeria
                    </h3>{" "}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">
                    Acesse fotos e vídeos de eventos e atividades do Sindepro.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href="/galeria"
                      className="text-red-700 hover:underline text-sm"
                    >
                      {" "}
                      Acessar{" "}
                    </Link>
                    <div className="group-hover:animate-shake group-hover:scale-125 transition-all duration-300">
                      {" "}
                      <Image
                        src="/general/padlock.png"
                        alt="Acesso restrito"
                        width={20}
                        height={20}
                      />{" "}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">
                    Somente afiliados
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Próximos Eventos
              </h2>
              <Link href="/eventos" className="text-red-700 hover:underline">
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventoNewsData.map((evento, index) => (
                <div
                  key={`evento-section-${evento._id}-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex"
                >
                  <div className="relative w-1/3">
                    <Image
                      src={evento.imagem || "/general/no-image.jpg"}
                      alt={evento.titulo || "Imagem do evento"}
                      fill
                      sizes="(max-width: 768px) 33vw, 16vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <div className="text-red-700 font-medium mb-1">
                      {evento.data
                        ? new Date(evento.data).toLocaleDateString("pt-BR", {
                            timeZone: "UTC",
                          })
                        : ""}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-red-700">
                      <Link href={`/noticias/${evento._id}`}>
                        {evento.titulo}
                      </Link>
                    </h3>
                    <Link
                      href={`/noticias/${evento._id}`}
                      className="mt-2 inline-block text-red-700 hover:underline text-sm"
                    >
                      Saiba mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="-mx-[10%]">
        <Footer />
      </div>
    </div>
  );
}
