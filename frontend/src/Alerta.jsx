import "./Css/Alerta.css";

function Alerta({ mensagem }) {
  return (
    <div className="alerta-fundo">
      <div className="alerta">
        <h1>Atenção!</h1>
        <p>{mensagem}</p>
      </div>
      <div className="alerta-fechar">X</div>
    </div>
  );
}

export default Alerta;
