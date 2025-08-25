import "./Css/Alerta.css";

function Alerta(mensagem) {
  return (
    <div className="alerta">
      <h1>Atenção!</h1>
      <p>{mensagem}</p>
    </div>
  );
}

export default Alerta;
