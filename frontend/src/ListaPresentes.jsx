import React, { useEffect, useState } from "react";
import "./Css/ListaPresentes.css";
import NovaPessoa from "./NovaPessoa";
import Pessoas from "./Pessoas";
import Editar from "./Editar";

export default function ListaPresentes({ onSaida }) {
  const [pessoaSelecionada, setPessoaSelecionada] = useState(false);
  const [busca, setBusca] = useState("");
  const [visitantes, setVisitantes] = useState([]);
  const [showEditar, setShowEditar] = useState(false);

  const buscarVisitantes = async () => {
    try {
      const res = await fetch("http://localhost:5000/visitas/pessoa_camara");
      const data = await res.json();
      setVisitantes(data);
    } catch (err) {
      console.error("Erro ao buscar visitantes:", err);
    }
  };

  const mudarPessoa = (texto, idPessoa) => {
    console.log(texto);
    setPessoaSelecionada(idPessoa);
    setShowEditar(true);
  };

  useEffect(() => {
    buscarVisitantes();
  }, []);

  function finalizarVisitaBtn(idVisita) {
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
        buscarVisitantes();
      } catch (err) {
        console.error(err);
        alert("Erro na conexão com o servidor");
      }
    };
    finalizarVisita();
  }
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
            {listaFiltrada.map((pessoa, index) => {
              return (
                <Pessoas
                  key={index}
                  visitas={pessoa}
                  onClick={() => {
                    mudarPessoa(
                      `Você clicou na pessoa: ${pessoa.Nome}`,
                      pessoa.idPessoa
                    );
                  }}
                  registrarSaida={() => finalizarVisitaBtn(pessoa.idPessoa)}
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
