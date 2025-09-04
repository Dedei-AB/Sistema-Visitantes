import { useState } from "react";
import style from "./Css/Pessoas.module.css";

function Pessoas({ visitas, onClick, registrarSaida }) {
  if (visitas.DateTimeSaida) {
    const [dataEntrada, setDataEntrada] = useState(
      visitas.DateTimeEntrada.replaceAll("-", "/").split("T")[0]
    );
    const [horaEntrada, setHoraEntrada] = useState(
      visitas.DateTimeEntrada.split("T")[1].split(".")[0]
    );
    const [horaSaida, sethoraSaida] = useState(
      visitas.DateTimeSaida.split("T")[1].split(".")[0]
    );

    return (
      <div
        id={`caixa-pessoa-cadastrada-${visitas.idPessoa}`}
        className={style["caixa-pessoa-cadastrada"]}
        onClick={onClick}
      >
        <nav className={style["topo-dados-cadastrado"]}>
          <p className={style.informacao}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={style["bi-person-fill"]}
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>{" "}
            {visitas.Nome}
          </p>
        </nav>

        <div className={style["dados-pessoa"]}>
          <p className={style["informacao"]}>
            <strong>CPF:</strong> {visitas.Cpf}
          </p>

          <p className={style.informacao}>
            <strong>Telefone:</strong> {visitas.Telefone}
          </p>

          <p className={style["informacao"]}>
            <strong>Data:</strong> {dataEntrada}
          </p>

          <p className={style["informacao"]}>
            <strong>Entrada:</strong> {horaEntrada}
          </p>

          <p className={style.informacao}>
            <strong>Saída:</strong> {horaSaida}
          </p>
        </div>
      </div>
    );
  } else {
    const [dataEntrada, setDataEntrada] = useState(
      visitas.DateTimeEntrada.replaceAll("-", "/").split("T")[0]
    );
    const [horaEntrada, setHoraEntrada] = useState(
      visitas.DateTimeEntrada.split("T")[1].split(".")[0]
    );

    return (
      <div
        id={`caixa-pessoa-cadastrada-${visitas.idPessoa}`}
        className={style["caixa-pessoa-cadastrada"]}
        onClick={onClick}
      >
        <nav className={style["topo-dados-cadastrado"]}>
          <p className={style.informacao}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={style["bi-person-fill"]}
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>{" "}
            {visitas.Nome}
          </p>
        </nav>

        <div className={style["dados-pessoa"]}>
          <p className={style["informacao"]}>
            <strong>CPF:</strong> {visitas.Cpf}
          </p>

          <p className={style.informacao}>
            <strong>Telefone:</strong> {visitas.Telefone}
          </p>

          <p className={style["informacao"]}>
            <strong>Data:</strong> {dataEntrada}
          </p>

          <p className={style["informacao"]}>
            <strong>Entrada:</strong> {horaEntrada}
          </p>

          <button onClick={registrarSaida} className={style["botao-saida"]}>
            Registrar Saída
          </button>
        </div>
      </div>
    );
  }
}

export default Pessoas;
