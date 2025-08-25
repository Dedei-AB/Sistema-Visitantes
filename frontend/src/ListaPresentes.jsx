import React, { useEffect, useState } from "react";
import "./Css/ListaPresentes.css";
import NovaPessoa from "./NovaPessoa";

export default function ListaPresentes({ onSaida }) {
  const [busca, setBusca] = useState("");
  const [visitantes, setVisitantes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/visitas/pessoa_camara")
      .then((response) => response.json())
      .then((data) => {
        setVisitantes(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar visitas:", error);
      });
  }, []);

  const adicionarVisitante = (pessoa) => {
    setVisitantes((prev) => [...prev, pessoa]);
  };

  const listaFiltrada = visitantes.filter((pessoa) =>
    pessoa.Nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container-lista-presenca">
      <h2 className="titulo">Visitantes Presentes: </h2>

      <input
        type="text"
        placeholder="Pesquisar nome..."
        className="campo-pesquisa"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="scroll-lista">
        {listaFiltrada.length === 0 ? (
          <p className="nenhum-visitante">Nenhuma pessoa encontrada.</p>
        ) : (
          <div className="lista-pessoas">
            {listaFiltrada.map((pessoa, index) => (
              <div key={index} className="caixa-pessoa">
                <div className="topo-dados">
                  <span className="hora-entrada">
                    Horário de entrada: {pessoa.HoraEntrada}
                  </span>
                  <button
                    onClick={() => onSaida && onSaida(pessoa.IdPessoa)}
                    className="botao-saida"
                  >
                    Registrar Saída
                  </button>
                </div>

                <div className="dados-pessoa">
                  <p className="nome">
                    <strong>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>{" "}
                    </strong>{" "}
                    {pessoa.Nome}
                  </p>

                  <div className="linha-horizontal">
                    <p>
                      <strong>CPF:</strong> {pessoa.Cpf}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {pessoa.Telefone}
                    </p>
                  </div>

                  <p>
                    <strong>Observação:</strong> {pessoa.Observacao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
