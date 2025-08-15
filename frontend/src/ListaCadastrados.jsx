import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./Css/ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default
import FiltroCalendario from "./FiltroCalendario";

function ListaCadastrados() {
  const [dado, setDado] = useState([]);

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

  return (
    <div className="container-cadastro">
      <h2 className="titulo-cdastrados">Visitas cadastradas:</h2>
      <p>{dado.length}</p>

      <FiltroCalendario />

      <div className="tabela-lista-cadastrados">
        {dado.map((pessoa, index) => {
          return <Pessoas key={index} visitas={pessoa} />;
        })}
      </div>
    </div>
  );
}

export default ListaCadastrados;
