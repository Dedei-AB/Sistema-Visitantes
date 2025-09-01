import style from "./Css/Alerta.module.css";

function Alerta({ mensagem, onClick }) {
  return (
    <div className={style["alerta-fundo"]}>
      <div className={style.alerta}>
        <nav className={style.atention}>
          <h1>Atenção!</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={style["alerta-fechar-button"]}
            onClick={onClick}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </nav>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}

export default Alerta;
