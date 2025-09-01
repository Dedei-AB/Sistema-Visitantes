import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./Css/ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default
import FiltroCalendario from "./FiltroCalendario";
import Editar from "./Editar";

function ListaCadastrados() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [dado, setDado] = useState([]);

  const mudarPessoa = (texto, idPessoa) => {
    console.log(texto);
    setPessoaSelecionada(idPessoa);
    setShowEditar(true);
  };

  const dadosFiltrados = dado.filter((pessoa) =>{
    if (!periodoSelecionado) return true;
    const dataEntrada = new Date(pessoa.DateTimeEntrada);
    const startDate = new Date(periodoSelecionado.startDate)
    const endDate = new Date(periodoSelecionado.endDate);
    endDate.setHours(23, 59, 59, 999); //ajusta para incluir o dia inteiro
    return(
      dataEntrada >= startDate && dataEntrada <= endDate
    );
  });

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

      <FiltroCalendario onPeriodoChange={setPeriodoSelecionado} />

      <div className="tabela-lista-cadastrados">
        {dadosFiltrados.map((pessoa, index) => {
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
