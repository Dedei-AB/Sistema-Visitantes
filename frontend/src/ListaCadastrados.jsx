import { useState } from "react";
import { useVisitas } from "./Dados";
import "./ListaCadastrados.css";

function ListaCadastrados() {
  const [aberto, setAberto] = useState(false);
  const { visita, setVisita } = useVisitas();

  return (
    <div className="container-cadastro">
      <h1>Quantidade de visitas cadastradas:</h1>
      <p>{visita.length}</p>

      <h1
        onClick={() => setAberto(!aberto)}
        className="box-visitas"
        style={{ cursor: "pointer" }}
      >
        Visitas:{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi bi-caret-up-fill arrow ${aberto ? "rotate" : ""}`}
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      </h1>

      <ul style={{ display: aberto ? "block" : "none" }}>
        {visita.map((pessoa, index) => {
          return <li key={index}>{pessoa.Nome}</li>;
        })}
      </ul>
    </div>
  );
}

export default ListaCadastrados;
