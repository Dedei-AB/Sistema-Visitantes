import React, { useState } from "react";
import "./ListaPresentes.css";

export default function PessoasPresentes({ pessoas, onSaida }) {
  const [busca, setBusca] = useState("");

  const barraPesquisa = pessoas.filter((pessoa) =>
    pessoa.nome.toLowerCase().includes(busca.toLowerCase())
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

      {barraPesquisa.length === 0 ? (
        <p className="nenhum-visitante">Nenhuma pessoa encontrada.</p>
      ) : (
        <div className="lista-pessoas">
          {barraPesquisa.map((pessoa) => (
            <div key={pessoa.id} className="caixa-pessoa">
              <div className="topo-dados">
                <span className="hora-entrada">
                  Horário de entrada: {pessoa.horaEntrada}
                </span>
                <button
                  onClick={() => onSaida(pessoa.id)}
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
                  {pessoa.nome}
                </p>

                <div className="linha-horizontal">
                  <p>
                    <strong>CPF:</strong> {pessoa.cpf}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {pessoa.telefone}
                  </p>
                </div>
                <p>
                  <strong>Observação:</strong> {pessoa.observacao}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

