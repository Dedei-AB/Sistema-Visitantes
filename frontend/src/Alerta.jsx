import { useState } from "react";
import "./Css/Alerta.css";

function Alerta({ mensagem }) {
  const [fecharAlerta, setFecharAlerta] = useState(true);

  return (
    fecharAlerta && (
      <div className="alerta-fundo">
        <div className="alerta">
          <nav className="atention">
            <h1>Atenção!</h1>
            <div className="alerta-fechar">
              <button
                className="alerta-fechar-button"
                onClick={() => setFecharAlerta(false)}
              >
                X
              </button>
            </div>
          </nav>
        </div>
      </div>
    )
  );
}

export default Alerta;
