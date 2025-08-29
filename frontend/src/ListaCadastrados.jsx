import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./Css/ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default
import FiltroCalendario from "./FiltroCalendario";
import Editar from "./Editar";

function ListaCadastrados() {
  const [pessoaSelecionada, setPessoaSelecionada] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [dado, setDado] = useState([]);

  const mudarPessoa = (texto, idPessoa) => {
    console.log(texto);
    setPessoaSelecionada(idPessoa);
    setShowEditar(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/visitas/pessoa_visita")
      .then((response) => response.json())
      .then((data) => {
        setDado(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar visitas:", error);
      });
  }, []);

  // const listaFiltrada = visitantes.filter((pessoa) =>
  //   pessoa.Nome.toLowerCase().includes(busca.toLowerCase())
  // );

  return (
    <div className="container-cadastro">
      <h2 className="titulo-cadastrados">Visitas cadastradas:</h2>
      <input
        type="text"
        className="busca-lista-cadastro"
        placeholder="Pesquisar por campo..."
      />
      {/* <input
        type="text"
        placeholder="Pesquisar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      /> */}

      <FiltroCalendario />

      <div className="tabela-lista-cadastrados">
        {dado.map((pessoa, index) => {
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
            />
          );
        })}
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

export default ListaCadastrados;
