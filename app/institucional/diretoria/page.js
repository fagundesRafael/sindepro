//app/institucional/diretoria/page.js
"use client";
import Image from "next/image"; // Make sure Image is imported
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
                    {/* Diretoria Atual - NÃO COLAPSÁVEL */}
                    <section className="mb-6 bg-gray-50 rounded-lg p-8 shadow"> {/* Increased bottom margin */}
                        <h2 className="text-4xl font-bold text-red-700 mb-6 text-center">DIRETORIA ATUAL SINDEPRO (2023/2026)</h2> {/* Increased bottom margin */}

                        {/* Flex container for Image and Text */}
                        <div className="flex flex-col md:flex-row md:items-start md:gap-8 max-w-4xl mx-auto">

                            {/* Image Column */}
                            <div className="flex-shrink-0 mx-auto flex-col w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0 flex justify-center md:justify-start">
                                <Image
                                    src="/general/presidente.jpeg" // Path relative to the public directory
                                    alt="Foto do Presidente Dr Mário Jorge Pinto Sobrinho"
                                    width={200}  // Specify desired width (adjust as needed)
                                    height={250} // Specify desired height (adjust to maintain aspect ratio)
                                    className="rounded-lg shadow-md object-cover" // Style the image
                                    priority // Optional: Load image faster if it's above the fold
                                />
                                <h1 className="relative text-red-600 text-sm mt-2">Dr Mário Jorge Pinto Sobrinho</h1>
                                {/* <h2 className="text-red-600" >Presidente SINDEPRO</h2> */}
                            </div>

                            {/* Text Column */}
                            <div className="text-slate-700 flex-grow"> {/* Removed max-w-3xl mx-auto, added flex-grow */}
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Presidente:</span> <span className="break-words">Dr Mário Jorge Pinto Sobrinho</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Vice-Presidente:</span> <span className="break-words">Dr Cristiano Lopes Ferreira</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Secretário Geral:</span> <span className="break-words">Dr Marcos Correia</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Tesoureiro:</span> <span className="break-words">Dra Janaína Xander Wessel</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Relações Intersindicais:</span> <span className="break-words">Dr Júlio Cesar de Souza Ferreira</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Diretor de Esportes e Cultura:</span> <span className="break-words">Dr Ronicir Manfroi</span></p>
                                <p className="flex mb-1"><span className="font-bold w-48 sm:w-56 flex-shrink-0">Diretor de Relações Públicas:</span> <span className="break-words">Dr Fábio Henrique Fernandes de Campos</span></p>

                                <div className="mt-6">
                                    <p className="font-bold text-lg mb-2">Conselho Fiscal:</p>
                                    <ul className="list-disc pl-6 sm:pl-10 space-y-1">
                                        <li>Dr Anderson Fernandes e Melo</li>
                                        <li>Dr Raimundo Mendes de Souza</li>
                                        <li>Dra Ingrid da Silva Brito Brandão</li>
                                    </ul>
                                </div>

                                <div className="mt-6">
                                    <p className="font-bold text-lg mb-2">Suplentes:</p>
                                    <ul className="list-disc pl-6 sm:pl-10 space-y-1">
                                        <li>Dr Hazael Francisco dos Santos</li>
                                        <li>Dr Herivelto Leal de Souza</li>
                                        <li>Dr Juracy Henrique de Souza Aguiar</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Seção para outras diretorias e histórico - Usando details/summary */}
                    <div className="space-y-4"> {/* Adiciona espaço entre os elementos <details> */}

                      {/* Diretoria SINDEPRO - 2017/2018 */}
                      <details className="bg-white p-4 rounded-lg shadow group"> {/* Adicionado group para possível estilização open: */}
                          <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              DIRETORIA SINDEPRO 2017/2018
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span> {/* Indicador de expansão */}
                          </summary>
                          <div className="mt-4 text-slate-700 max-w-3xl mx-auto"> {/* Adicionado mt-4 para espaço após summary */}
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Presidente:</span> <span>Dr. Renato Eduardo de Souza</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Vice-presidente:</span> <span>Dr. Fábio Henrique Fernandez de Campos</span></p>
                              {/* <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Secretário-geral:</span> <span>Dr. Sandro Luiz Alves de Moura</span></p> */}
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Tesoureiro:</span> <span>Dr. Mário Jorge Pinto Sobrinho</span></p>
                              {/* <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor social:</span> <span>Dr. Thiago Leite Flores Pereira</span></p> */}
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor de esportes e cultura:</span> <span>Adilson de Almeida Junior</span></p>

                              <div className="mt-6">
                                  <p className="font-bold text-lg mb-2">Conselho fiscal:</p>
                                  <ul className="list-disc pl-10 space-y-1">
                                      <li>Dr. Pedro Roberto Gemignani Macebo</li>
                                      <li>Dr. Walkiria Vieira Boaventura Manfroi</li>
                                      <li>Dr. Lizett Possidônio</li>
                                  </ul>
                              </div>

                              <div className="mt-6">
                                  <p className="font-bold text-lg mb-2">Suplentes:</p>
                                  <ul className="list-disc pl-10 space-y-1">
                                      <li>Dra. Leisaloma Souza Silva Carvalho</li>
                                      <li>Dr. Silvio Hirosh Yamaguchi</li>
                                  </ul>
                              </div>
                          </div>
                      </details>

                      {/* Diretoria ADEPOL - 2016/2018 */}
                      <details className="bg-white p-4 rounded-lg shadow group"> {/* Adicionado group para possível estilização open: */}
                          <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              DIRETORIA ADEPOL 2016/2018
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span> {/* Indicador de expansão */}
                          </summary>
                          <div className="mt-4 text-slate-700 max-w-3xl mx-auto"> {/* Adicionado mt-4 para espaço após summary */}
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Presidente:</span> <span>Dr. Renato Eduardo de Souza</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Vice-presidente:</span> <span>Dr. Júlio César Souza Ferreira</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Secretário-geral:</span> <span>Dr. Sandro Luiz Alves de Moura</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Tesoureiro:</span> <span>Dr. Antônio Garção Sobral Neto</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor social:</span> <span>Dr. Thiago Leite Flores Pereira</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor de esportes:</span> <span>Dr. Arismar Araújo de Lima</span></p>

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
                      </details>

                      {/* Diretoria Anterior - COLAPSÁVEL */}
                      <details className="bg-white p-4 rounded-lg shadow group">
                           <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                               DIRETORIA ANTERIOR (Período não especificado)
                               <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                           </summary>
                          <div className="mt-4 space-y-2 text-slate-700 max-w-3xl mx-auto">
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Presidente:</span> <span>Antônio Garção Sobral Neto</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Vice-presidente:</span> <span>Victor de Santana Menezes</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Secretária Geral:</span> <span>Márcia Cristina Gazoni</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Tesoureiro:</span> <span>Mário Jorge Pinto Sobrinho</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor de Relações Públicas e Assistência:</span> <span>Júlio César de Souza Ferreira</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor de Cultura Esportes:</span> <span>Marcos Vinícius Alves e Silva Filho</span></p>
                              <p className="flex mb-1"><span className="font-bold w-56 flex-shrink-0">Diretor de Relações Sociais:</span> <span>Fernando Antônio de Souza Oliveira</span></p>

                              <div className="mt-6">
                                  <p className="text-md text-gray-700">E ainda Samir Fouad, Lucas Torres e Juraci Henrique de Souza Aguiar no Conselho Fiscal e Francisco Borges Neto, Leisaloma Sousa Silva Carvalho e Juliana Hérica, como suplentes</p>
                              </div>
                          </div>
                      </details>

                      {/* Histórico Intro */}
                       <div className="mt-8 text-slate-700 max-w-3xl mx-auto text-center"> {/* Increased top margin */}
                           <p className="text-lg font-semibold">HISTÓRICO DE DIRETORIAS</p>
                           <p>O atual Sindicato teve início como Associação no ano de 1988 até sua criação em 1992.</p>
                       </div>

                      {/* Diretorias históricas - já usando acordeão */}
                      <details className="bg-white p-4 rounded-lg shadow group">
                          <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              21/04/1988/89 (Associação)
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                          </summary>
                          <div className="mt-4 text-slate-700 max-w-3xl mx-auto space-y-1">
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

                      <details className="bg-white p-4 rounded-lg shadow group">
                           <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              20/03/1990/91 (Associação)
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                           </summary>
                          <div className="mt-4 text-slate-700 max-w-3xl mx-auto space-y-1">
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

                      <details className="bg-white p-4 rounded-lg shadow group">
                           <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              21/04/1992/93 (Primeira diretoria do SINDEPRO)
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                           </summary>
                          <div className="mt-4 text-slate-700 max-w-3xl mx-auto space-y-1">
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

                      {/* Placeholder para demais diretorias */}
                      <details className="bg-white p-4 rounded-lg shadow group">
                           <summary className="font-bold text-red-700 cursor-pointer py-2 list-none flex justify-between items-center">
                              Ver demais diretorias históricas
                              <span className="text-red-700 transform transition-transform duration-200 group-open:rotate-180">&#9660;</span>
                           </summary>
                          <div className="mt-4 space-y-8">
                              {/* Aqui você adicionaria os demais períodos históricos no mesmo formato <details> */}
                              <p className="text-center text-gray-600">Informações sobre outras diretorias históricas serão adicionadas aqui.</p>
                              {/* Exemplo:
                              <details className="bg-gray-50 p-3 rounded shadow-inner">
                                  <summary className="font-semibold text-slate-800 cursor-pointer">YYYY/YYYY</summary>
                                  <div className="mt-2 text-slate-700"> ... membros ... </div>
                              </details>
                              */}
                          </div>
                      </details>
                    </div> {/* Fim do space-y-4 */}

                </div>
            </main>

            <div className="-mx-[10%]">
                <Footer />
            </div>
            <OfflineNotice />
        </div>
    );
}