// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "SINDEPRO",
  description: "Sindicato dos Delegados de Polícia Civil do Estado de Rondônia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      {/* Add flex flex-col min-h-screen here */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}> 
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}