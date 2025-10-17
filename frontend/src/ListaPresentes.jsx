import React, { useEffect, useState, useContext } from "react";
import "./Css/ListaPresentes.css";
import Pessoas from "./Pessoas";
import Editar from "./Editar";
import { VisitasContext } from "./VisitasContext";

export default function ListaPresentes({ onSaida }) {
  const [pessoaSelecionada, setPessoaSelecionada] = useState(false);
  const [busca, setBusca] = useState("");
  const { visitantes, carregarVisitantes, carregarPessoaCadastrada } =
    useContext(VisitasContext);
  const [showEditar, setShowEditar] = useState(false);

  const removerAcentos = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const mudarPessoa = (texto, idPessoa) => {
    console.log(texto);
    setPessoaSelecionada(idPessoa);
    setShowEditar(true);
  };

  function finalizarVisitaBtn(idVisita) {
    console.log(idVisita);
    const finalizarVisita = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/visitas/finalizar/${idVisita}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        alert(data.message || "Erro ao finalizar visita");
        carregarVisitantes();
        carregarPessoaCadastrada();
      } catch (err) {
        console.error(err);
        alert("Erro na conexão com o servidor");
      }
    };
    finalizarVisita();
  }
  const listaFiltrada = visitantes.filter((pessoa) => {
    const buscaEhNumerica = /^\d+$/.test(busca.replace(/\D/g, ""));
    const nome = pessoa.Nome || "";
    const cpf = (pessoa.Cpf || "").replace(/\D/g, "");

    const termoBusca = removerAcentos(busca.toLowerCase());
    const nomeNormalizado = removerAcentos(nome.toLowerCase());
    const termoNumerico = busca.replace(/\D/g, "");

    const correspondeBusca = buscaEhNumerica
      ? cpf.includes(termoNumerico)
      : nomeNormalizado.includes(termoBusca);

    return correspondeBusca;
  });

  return (
    <div className="container-lista-presenca">
      <h2 className="titulo">Visitantes Presentes: </h2>

      <input
        type="text"
        placeholder="Pesquisar nome ou CPF..."
        className="campo-pesquisa"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="scroll-lista">
        {listaFiltrada.length === 0 ? (
          <p className="nenhum-visitante">Nenhuma pessoa encontrada.</p>
        ) : (
          <div className="lista-pessoas">
            {listaFiltrada.map((pessoa, index) => {
              return (
                <Pessoas
                  key={index}
                  visitas={pessoa}
                  editar={() => {
                    mudarPessoa(
                      `Você clicou na pessoa: ${pessoa.Nome}`,
                      pessoa.idPessoa
                    );
                  }}
                  registrarSaida={() => finalizarVisitaBtn(pessoa.idVisitas)}
                />
              );
            })}
          </div>
        )}
      </div>

      {showEditar && (
        <Editar
          onClick={() => setShowEditar(false)}
          idPessoa={pessoaSelecionada}
        />
      )}
    </div>
  );
}
