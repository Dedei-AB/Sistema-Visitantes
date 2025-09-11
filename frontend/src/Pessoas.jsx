import { useState } from "react";
import style from "./Css/Pessoas.module.css";

function Pessoas({ visitas, editar, registrarSaida }) {
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
        <div onClick={editar} className={style["pessoa-editar"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
          </svg>
        </div>

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
        <div onClick={editar} className={style["pessoa-editar"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
          </svg>
        </div>

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
