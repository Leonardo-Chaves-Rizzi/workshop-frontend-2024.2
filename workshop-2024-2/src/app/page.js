"use client"

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Api() {
  const [data, setData] = useState([]);

  // para poder integrar a api
  useEffect(() => {
    async function fetchData() {

      // capturando a api
        const resposta = await fetch(
          "https://valorant-api.com/v1/agents"
        );

        // pegando a api e transformando os dados em um JSON
        const {data} = await resposta.json();

        // para verificar se o agente tem todas as informações pedidas no desafio constando na api
        const dataFiltered = data.filter(
          (item) => item.displayIcon && item.role && item.displayName && item.description
        );
        
        // está pegando o filtro e passando nos dados
        setData(dataFiltered);
    }
    //chamando a função de captura da api para ser usada
    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.cabecalho}>
        <nav className={styles.nav_itens}>
          <div className={styles.logo}></div>
          <div className={styles.opcoes}>
            <a href="#">Início</a>
            <a href="#">Agentes</a>
          </div>
        </nav>
      </section>
      <section className={styles.conteudo_cards}>
        <div className={styles.container_card}>
          {data &&
            data.map((item) => (
              <div key={item.agents} className={styles.card}>
                <img src={item.displayIcon} alt={item.displayName} />
                <div className={styles.card_infos}>
                  <h3>{item.displayName}</h3>
                  <h5>{item.role.displayName}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
