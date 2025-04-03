//app/institucional/contatos/page.js
"use client";
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import Footer from '@/components/Footer';
import OfflineNotice from '@/components/OfflineNotice';

export default function Contatos() {
  return (
    <div className="min-h-screen flex flex-col">
      <SocialBar />
      <Navbar />
      <OfflineNotice />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contatos</h1>
        {/* Conteúdo da página */}
      </main>
      
      <Footer />
    </div>
  );
}