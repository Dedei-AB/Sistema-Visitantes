import { useState } from "react";
import "./Css/Alerta.css";

function Alerta({ mensagem, onClick }) {
  const [fecharAlerta, setFecharAlerta] = useState(true);

  return (
    fecharAlerta && (
      <div className="alerta-fundo" onClick={onClick}>
        <div className="alerta">
          <nav className="atention">
            <h1>Atenção!</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="alerta-fechar-button"
              onClick={() => setFecharAlerta(false)}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </nav>
          <p>{mensagem}</p>
        </div>
      </div>
    )
  );
}

export default Alerta;
