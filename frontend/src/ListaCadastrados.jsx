import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./ListaCadastrados.css";

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

      <h2>Visitas:</h2>

      <div className="tabela-lista-cadastrados">
        {dado.map((pessoa, index) => {
          console.log(pessoa);
          return <Pessoas key={index} visitas={pessoa} />;
        })}
      </div>
    </div>
  );
}

export default ListaCadastrados;
