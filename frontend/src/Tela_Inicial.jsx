import React, { useState } from "react";
import "./CaixaResumo.css"; // Lembre de criar/ajustar o CSS para esse componente
import ListaCadastrados from "./ListaCadastrados";

export default function CaixasResumo({ caixas = [] }) {
  const [visibilidade, setVisibilidade] = useState({});

  const toggleVisibilidade = (id) => {
    setVisibilidade((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <ListaCadastrados />
      <div className="caixas-resumo">
        {caixas.map((caixa) => (
          <div
            key={caixa.id}
            className={`card ${caixa.tipo}`}
            onClick={() => toggleVisibilidade(caixa.id)}
          >
            <header>
              <p>{caixa.titulo}</p>
            </header>
            <strong>{caixa.valor}</strong>

            {caixa.itens && visibilidade[caixa.id] && (
              <div className="lista-itens">
                <ul>
                  {caixa.itens.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
