//components/newsEvents.js
"use client";

import styles from './NewsEvents.module.css';

export default function NewsEvents() {
  // Array de notícias que serão exibidas no ticker
  const news = [
    "Sindepro realiza assembleia para discutir melhorias na carreira",
    "Curso de capacitação para delegados será realizado em agosto",
    "Nova sede do Sindepro será inaugurada no próximo mês",
    "Sindepro participa de reunião com secretário de segurança pública",
    "Conquista: aprovado projeto que beneficia delegados aposentados",
    "Delegados de Rondônia participam de congresso nacional",
    "Sindepro promove ação social em comunidade carente",
    "Novos convênios são firmados para beneficiar associados"
  ];
  
  // Concatena todas as notícias com separador de traço
  const fullText = news.join("     ----     "); // Usando traço como separador com espaços
  
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.ticker}>
        <span className={styles.tickerItem}>{fullText}</span>
        <span className={styles.tickerItem}>{fullText}</span>
      </div>
    </div>
  );
} 