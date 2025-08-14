import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default

function ListaCadastrados() {
  const [periodo, setPeriodo] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [dado, setDado] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

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

      <h2>Visitas:</h2>

      <div className="data-filtro-cadastrados">
        <h3>Selecione um período:</h3>
        <span
          className="descricao-calendario"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <i class="bi bi-calendar-range"></i>
          {periodo[0].startDate.toLocaleDateString()} -{" "}
          {periodo[0].endDate.toLocaleDateString()}
        </span>

        {showCalendar && (
          <span className="calendario-cadastrados">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setPeriodo([item.selection])}
              ranges={periodo}
              dateDisplayFormat="dd-MM-yyyy"
              direction="horizantal"
              months={1}
            />
            <button
              onClick={() => {
                setPeriodo(periodo); // confirma o período
                setShowCalendar(false); // fecha o calendário
              }}
              className="botao-calendario"
            >
              X
            </button>
          </span>
        )}
      </div>

      <div className="tabela-lista-cadastrados">
        {dado.map((pessoa, index) => {
          return <Pessoas key={index} visitas={pessoa} />;
        })}
      </div>
    </div>
  );
}

export default ListaCadastrados;
