//components/newsEvents.js
"use client";

import { useState, useEffect } from 'react';
import styles from './NewsEvents.module.css';
import Link from 'next/link';

export default function NewsEvents() {
  const [newsItems, setNewsItems] = useState([]);
  
  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        // Primeiro, busca as configurações para obter os IDs
        const configResponse = await fetch('/api/configs');
        const configData = await configResponse.json();
        
        // Extrai os IDs L1 até L8
        const newsIds = [];
        for (let i = 1; i <= 8; i++) {
          const id = configData[`L${i}`];
          if (id) newsIds.push(id);
        }

        // Busca as notícias correspondentes aos IDs
        const newsPromises = newsIds.map(id =>
          fetch(`/api/news/${id}`)
            .then(res => res.json())
            .catch(() => null)
        );

        const newsResults = await Promise.all(newsPromises);
        
        // Filtra resultados nulos e prepara array final
        const validNews = newsResults
          .filter(item => item && item.titulo)
          .map(item => ({
            id: item._id,
            titulo: item.titulo
          }));

        // Preenche o restante com "insira mais notícias" até completar 8 itens
        const fillerCount = 8 - validNews.length;
        const fillerItems = Array(fillerCount).fill({
          id: null,
          titulo: "insira mais notícias"
        });

        setNewsItems([...validNews, ...fillerItems]);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        // Em caso de erro, preenche com 8 itens de placeholder
        setNewsItems(Array(8).fill({
          id: null,
          titulo: "insira mais notícias"
        }));
      }
    };

    fetchNewsItems();
  }, []);

  // Concatena todos os títulos com separador
  const fullText = newsItems.map(item => {
    if (item.id) {
      return (
        `<a href="/noticias/${item.id}" class="${styles.newsLink}">${item.titulo}</a>`
      );
    }
    return `<span class="${styles.emptyNews}">${item.titulo}</span>`;
  }).join("     ----     ");

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.ticker}>
        <span 
          className={styles.tickerItem} 
          dangerouslySetInnerHTML={{ __html: fullText }}
        />
        <span 
          className={styles.tickerItem}
          dangerouslySetInnerHTML={{ __html: fullText }}
        />
      </div>
    </div>
  );
} 