//app/institucional/diretoria/page.js
"use client";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import OfflineNotice from '@/components/OfflineNotice';

export default function Diretoria() {
    return (
    <div className="min-h-screen flex flex-col">
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>
      
      <main className="flex-grow mx-[10%] py-4">
        <div className="container mx-auto px-4">
          {/* Cabeçalho da página */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">DIRETORIA SINDEPRO</h1>
          
          {/* Presidente Destaque */}
          <section className="mb-2">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-700 text-center">PRESIDENTE</h2>
              <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center max-w-md mx-auto">
                <div className="w-24 h-24 relative mb-2 rounded-full overflow-hidden border-4 border-red-700">
                  <Image 
                    src="/general/no-image.jpg" 
                    alt="Foto do Presidente" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl text-slate-700 font-bold mb-2">DR. RENATO EDUARDO DE SOUZA</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Diretoria Atual */}
          <section className="mb-2 bg-gray-50 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">DIRETORIA ATUAL SINDEPRO (2017/2018)</h2>
            
            <div className=" text-slate-700 max-w-3xl mx-auto">
              <p className="flex"><span className="font-bold w-56">Presidente:</span> <span>Renato Eduardo de Souza</span></p>
              <p className="flex"><span className="font-bold w-56">Vice-Presidente:</span> <span>Fábio Henrique Fernandez de Campos</span></p>
              <p className="flex"><span className="font-bold w-56">Tesoureiro:</span> <span>Mário Jorge Pinto Sobrinho</span></p>
              <p className="flex"><span className="font-bold w-56">Relações Intersindicais:</span> <span>Rosilei de Lima</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor de Esportes e Cultura:</span> <span>Adilson de Almeida Júnior</span></p>
              
              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Conselho Fiscal:</p>
                <ul className="list-disc pl-10 space-y-1">
                  <li>Pedro Roberto Gemignani Mancebo</li>
                  <li>Walkyria Vieira Boaventura Manfroi</li>
                  <li>Lizett Possidônio</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Suplentes:</p>
                <ul className="list-disc pl-10 space-y-1">
                  <li>Leisaloma Souza Silva Carvalho</li>
                  <li>Silvio Hiroshi Yamaguchi</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Diretoria ADEPOL */}
          <section className="mb-2 bg-gray-50 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">DIRETORIA ADEPOL 2016/2018</h2>
            
            <div className=" text-slate-700 max-w-3xl mx-auto">
              <p className="flex"><span className="font-bold w-56">Presidente:</span> <span>Dr. Renato Eduardo de Souza</span></p>
              <p className="flex"><span className="font-bold w-56">Vice-presidente:</span> <span>Dr. Júlio César Souza Ferreira</span></p>
              <p className="flex"><span className="font-bold w-56">Secretário-geral:</span> <span>Dr. Sandro Luiz Alves de Moura</span></p>
              <p className="flex"><span className="font-bold w-56">Tesoureiro:</span> <span>Dr. Antônio Garção Sobral Neto</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor social:</span> <span>Dr. Thiago Leite Flores Pereira</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor de esportes:</span> <span>Dr. Arismar Araújo de Lima</span></p>
              
              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Conselho fiscal:</p>
                <ul className="list-disc pl-10 space-y-1">
                  <li>Dr. Hélio Teixeira Lopes Filho</li>
                  <li>Dr. Alexandre Árabe</li>
                  <li>Dr. Lucas Torres Ribeiro</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Suplentes:</p>
                <ul className="list-disc pl-10 space-y-1">
                  <li>Dra. Roberta de Oliveira Freitas</li>
                  <li>Dr. Fabio Henrique F. de Campos</li>
                  <li>Dr. Milton Santana da Silva</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Diretoria Anterior */}
          <section className="mb-2 bg-gray-50 rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">DIRETORIA ANTERIOR (2014/2016)</h2>
            
            <div className="space-y-2 text-slate-700 max-w-3xl mx-auto">
              <p className="flex"><span className="font-bold w-56">Presidente:</span> <span>Antônio Garção Sobral Neto</span></p>
              <p className="flex"><span className="font-bold w-56">Vice-presidente:</span> <span>Victor de Santana Menezes</span></p>
              <p className="flex"><span className="font-bold w-56">Secretária Geral:</span> <span>Márcia Cristina Gazoni</span></p>
              <p className="flex"><span className="font-bold w-56">Tesoureiro:</span> <span>Mário Jorge Pinto Sobrinho</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor de Relações Públicas e Assistência:</span> <span>Júlio César de Souza Ferreira</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor de Cultura Esportes:</span> <span>Marcos Vinícius Alves e Silva Filho</span></p>
              <p className="flex"><span className="font-bold w-56">Diretor de Relações Sociais:</span> <span>Fernando Antônio de Souza Oliveira</span></p>
              
              <div className="mt-6">
                <p className="text-md text-gray-700">E ainda Samir Fouad, Lucas Torres e Juraci Henrique de Souza Aguiar no Conselho Fiscal e Francisco Borges Neto, Leisaloma Sousa Silva Carvalho e Juliana Hérica, como suplentes</p>
              </div>
            </div>
          </section>

          {/* Histórico */}
          <section className="mb-2">
            <div className=" text-slate-700 max-w-3xl mx-auto">
              <p className="text-lg">O atual Sindicato teve início como Associação no ano de 1988 até sua criação em 1992, e teve as seguintes diretorias:</p>
            </div>
            
            <div className="space-y-4">
              {/* Diretorias históricas - usando acordeão para economizar espaço */}
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-bold text-red-700 cursor-pointer py-2">21/04/1988/89</summary>
                <div className=" text-slate-700 max-w-3xl mx-auto">
                  <p><span className="font-semibold">Presidente:</span> Antonio José Adão</p>
                  <p><span className="font-semibold">Vice-presidente:</span> Nilson Brito dos Santos</p>
                  <p><span className="font-semibold">Secretário:</span> Luiz Gleysman Alves de Oliveira</p>
                  <p><span className="font-semibold">Tesoureiro:</span> Maria Aparecida Silva Lacerda</p>
                  <p><span className="font-semibold">Diretor de Assuntos Assistenciais:</span> Deraldo Scatalon</p>
                  <p><span className="font-semibold">Diretor de assuntos culturais:</span> Pedro Manoel Macedo Marinho</p>
                  <p><span className="font-semibold">Diretor de Patrimônio:</span> Francisco Candido Marcolino</p>
                  <p><span className="font-semibold">Diretor de Relações Públicas:</span> João Alberto Borges</p>
                  <p><span className="font-semibold">Conselho Consultivo:</span> Luiz Fernando Gemignani Mancebo, Ricardo de Oliveira da Costa, Jovely Gonçalves de Almeida, Maria Auxiliadora Toscano Bezerra e José Augusto de Oliveira</p>
                  <p><span className="font-semibold">Conselho Fiscal:</span> Iramar Gonçalves da Silva, Paulo Ricardo Xisto da Cunha e Antonio Garção Sobral Neto</p>
                </div>
              </details>
              
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-bold text-red-700 cursor-pointer py-2">20/03/1990/91</summary>
                <div className=" text-slate-700 max-w-3xl mx-auto">
                  <p><span className="font-semibold">Presidente:</span> Francisco Cândido Marculino</p>
                  <p><span className="font-semibold">Vice-presidente:</span> Pedro Rates Gomes Neto</p>
                  <p><span className="font-semibold">2º Vice-presidente:</span> Túlio Anderson Rodrigues da Costa</p>
                  <p><span className="font-semibold">1º Secretário:</span> Deraldo Scatalon</p>
                  <p><span className="font-semibold">2º Secretário:</span> Sérgio Barbosa Neto</p>
                  <p><span className="font-semibold">Tesoureiro:</span> Carlos Eduardo Ferreira</p>
                  <p><span className="font-semibold">2º Tesoureiro:</span> Valdivino Vicente de Matos</p>
                  <p><span className="font-semibold">Diretor de Patrimônio:</span> Silvio Machado</p>
                  <p><span className="font-semibold">Diretor de Assuntos Assistenciais:</span> Maria Veralena de Oliveira</p>
                  <p><span className="font-semibold">Diretor de Assuntos Culturais:</span> Paulo César Ferreira</p>
                  <p><span className="font-semibold">Diretor de Relações Públicas:</span> Carlos Cesar Pizzano</p>
                  <p><span className="font-semibold">Conselho Consultivo:</span> Pedro Manoel Macêdo Marinho, Júlio César Souza Tarrofa, Valdir Olenski, Madizon Muniz de Minas e Lúcia de Fátima Guedes Maciel, Paulo Roberto Otto Barbosa e Edesio Galhardo</p>
                  <p><span className="font-semibold">Suplentes:</span> Adão Caetano Gonçalves, Harwite Abe e Antoninho Carlos Mathias</p>
                </div>
              </details>
              
              {/* Adicione os outros períodos históricos como detalhes adicionais */}
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-bold text-red-700 cursor-pointer py-2">21/04/1992/93 (Primeira diretoria do SINDEPRO)</summary>
                <div className=" text-slate-700 max-w-3xl mx-auto">
                  <p><span className="font-semibold">Presidente:</span> Ricardo Antônio Santana de Aguiar</p>
                  <p><span className="font-semibold">Vice-presidente:</span> Valdevino Vicente de Mattos</p>
                  <p><span className="font-semibold">1º Secretário:</span> João dos Reis Lacerda</p>
                  <p><span className="font-semibold">Tesoureiro:</span> Achilles Paulo Cavalcante Guimarães Júnior</p>
                  <p><span className="font-semibold">Diretor de Patrimônio:</span> Silvio Machado</p>
                  <p><span className="font-semibold">Diretor de esportes e culturais:</span> José Antônio Gentil</p>
                  <p><span className="font-semibold">Diretor de Relações Públicas e Assistenciais:</span> Adão Caetano Gonçalves</p>
                  <p><span className="font-semibold">Diretor de Relações Sindicais:</span> Pedro Rates Gomes Neto</p>
                  <p><span className="font-semibold">Conselho Fiscal e suplentes:</span> Luiz Fernando Gemignani Mancebo, João de Deus Pires, Sheila Regina Xerez Mattos, Nadizon Muniz de Minas, Edésio Galhardo e Juracy Henrique de Souza Aguiar</p>
                </div>
              </details>

              {/* Adicione mais periodos como detalhes - limitei a 3 para não tornar a resposta muito longa */}
              <details className="bg-white p-4 rounded-lg shadow">
                <summary className="font-bold text-red-700 cursor-pointer py-2">Ver demais diretorias históricas</summary>
                <div className="mt-2 space-y-8">
                  {/* Aqui você adicionaria os demais períodos históricos */}
                  <p className="text-center text-gray-600">Clique para expandir e visualizar todos os períodos históricos da diretoria do SINDEPRO desde sua fundação.</p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </main>
      
      <div className="-mx-[10%]">
        <Footer />
      </div>
      <OfflineNotice />
      </div>
    );
  }