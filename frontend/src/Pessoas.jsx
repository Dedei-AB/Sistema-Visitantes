import { useState } from "react";

function Pessoas({ visitas }) {
  const entrada = new Date(visitas.DateTimeEntrada);
  const [dataEntrada, setDataEntrada] = useState(
    visitas.DateTimeEntrada.split("T")[0]
  );
  const [horaEntrada, setHoraEntrada] = useState(
    visitas.DateTimeEntrada.split("T")[1].split(".")[0]
  );

  return (
    <div
      key={visitas.id}
      id={`caixa-pessoa-cadastrada-${visitas.idPessoa}`}
      className="caixa-pessoa-cadastrada"
    >
      <div className="topo-dados-cadastrado">
        <span className="hora-entrada">Horário de entrada: {horaEntrada}</span>
      </div>
      <div className="dados-pessoa">
        <p className="nome">
          <strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>{" "}
          </strong>{" "}
          {visitas.Nome}
        </p>

        <div className="linha-horizontal">
          <p>
            <strong>CPF:</strong> {visitas.Cpf}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pessoas;
