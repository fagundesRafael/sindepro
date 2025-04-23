// //app/sobre/page.js
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Footer from "@/components/Footer";
import OfflineNotice from "@/components/OfflineNotice";

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {" "}
      {/* Added a light bg for contrast */}
      <div className="-mx-[10%]">
        <SocialBar />
        <Navbar />
      </div>
      <main className="flex-grow mx-[10%] py-8">
        {" "}
        {/* Increased py padding */}
        <div className="container mx-auto px-4">
          <p className="text-3xl md:text-[40px] font-semibold text-center text-red-700 mb-6">
            {" "}
            {/* Responsive text size */}
            32 anos de uma história de lutas e conquistas!
          </p>
                    
          {/* Conteúdo textual */}
          <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto text-slate-700 space-y-5 text-justify">
            {" "}
            {/* White card look */}
            {/* Parágrafos */}
            <p className="text-base md:text-lg leading-relaxed">
              {" "}
              {/* Responsive text size and improved line height */}O{" "}
              <strong>
                Sindicato dos Delegados de Polícia do Estado de Rondônia
                (SINDEPRO)
              </strong>{" "}
              foi fundado em 04 de abril de 1992. Sua origem remonta à{" "}
              <strong>Associação dos Delegados do Estado de Rondônia</strong>,
              criada em 1988, que atuou até 1992, quando evoluiu para a forma
              sindical que conhecemos hoje.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Sediado em Porto Velho-RO, o Sindepro foi constituído com a
              finalidade primordial de <strong>representar legalmente</strong>{" "}
              os Delegados de Polícia do Estado de Rondônia perante os poderes
              constituídos, defendendo incansavelmente os{" "}
              <strong>direitos e interesses coletivos e individuais</strong> da
              categoria.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Ao longo dessas mais de três décadas, o Sindicato tem sido um ator
              fundamental em diversas{" "}
              <strong>questões judiciais e administrativas</strong>. Além disso,
              colabora ativamente com os poderes públicos, bem como com outros
              sindicatos e associações de classe, no tratamento de matérias
              relevantes e de interesse direto de seus associados, sempre
              buscando fortalecer e valorizar a carreira de Delegado de Polícia
              em Rondônia.
            </p>
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
