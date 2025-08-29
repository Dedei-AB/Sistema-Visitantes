import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./Css/ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default
import FiltroCalendario from "./FiltroCalendario";
import Alerta from "./Alerta";

function ListaCadastrados() {
  const [mensagem, setMensagem] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [dado, setDado] = useState([]);

  function mudarAlerta(texto) {
    console.log("sgjs");
    setMensagem(texto);
    setMostrarAlerta(!mostrarAlerta);
  }

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
                mudarAlerta(`Você clicou na pessoa: ${pessoa.Nome}`);
              }}
            />
          );
        })}
        {mostrarAlerta && (
          <Alerta onClick={() => setMostrarAlerta(false)} mensagem={mensagem} />
        )}
      </div>
    </div>
  );
}

export default ListaCadastrados;
