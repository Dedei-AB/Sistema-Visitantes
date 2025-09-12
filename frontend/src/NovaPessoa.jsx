import React, { useRef, useState } from "react";
import Alerta from "./Alerta";
import "./Css/NovaPessoa.css";

export default function NovaPessoa() {
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [msgAlertaComponente, setMsgAlertaComponente] = useState("Aguarde...");
  const [mostrarAlertaComponente, setMostrarAlertaComponente] = useState(false);
  //------------Informações----------------------
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [obs, setObservacao] = useState("");
  //------------Horario--------------------------
  const [dataHoje, setDataHoje] = useState("");
  const [horaExata, setHoraExata] = useState("");
  const [dateTimeEntrada, setDateTimeEntrada] = useState("");

  //-------------Código de linkagem com BD---------
  const handleSubmit = async (e) => {
    console.log("variavel que salva: ", dateTimeEntrada);
    e.preventDefault();

    if (!nome) {
      alert("O campo Nome é obrigatório");
      return;
    }

    try {
      console.log("Enviando DateTimeEntrada:", dateTimeEntrada); // Log para depuração
      const responsePessoa = await fetch(
        "http://localhost:5000/visitas/entrada_de_pessoas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Nome: nome,
            Cpf: cpf,
            Telefone: telefone,
            Observacao: obs,
            DateTimeEntrada: dateTimeEntrada,
          }),
        }
      );
      const dataRes = await responsePessoa.json();
      if (!responsePessoa.ok) throw new Error(dataRes.error);
      setMsgAlertaComponente("Visita cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro no frontend:", error);
      setMsgAlertaComponente("Erro ao cadastrar visita.");
    }
    setMostrarAlert(false);
    setMostrarAlertaComponente(true);
  };
  const pegarDiaHora = () => {
    const agora = new Date();

    const partes = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(agora);

    const dia = partes.find((p) => p.type === "day").value;
    const mes = partes.find((p) => p.type === "month").value;
    const ano = partes.find((p) => p.type === "year").value;
    const hora = partes.find((p) => p.type === "hour").value;
    const minuto = partes.find((p) => p.type === "minute").value;
    const segundo = partes.find((p) => p.type === "second").value;

    const isoFormat = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    setDateTimeEntrada(isoFormat);
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length === 0) return "";
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 11)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(
        3,
        7
      )}-${numeros.slice(7)}`;
    return numeros;
  };

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleChangeTelefone = (e) =>
    setTelefone(formatarTelefone(e.target.value));
  const handleChangeCPF = (e) => setCpf(formatarCPF(e.target.value));

  const handleClickBtn = () => {
    setMostrarAlert(true);
    pegarDiaHora();
  };

  return (
    <>
      <div className="caixa-resumo">
        <button className="AdicionarBtn1" onClick={handleClickBtn}>
          <strong className="strongBtn">
            Nova Pessoa -
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </strong>
        </button>
      </div>

      {mostrarAlert && (
        <div className="bottomAlert">
          <form className="boxAlert" onSubmit={handleSubmit}>
            <nav>
              <input
                type="time"
                step={1}
                value={horaExata}
                onChange={(e) => setHoraExata(e.target.value)}
              />
              <input
                type="date"
                value={dataHoje}
                onChange={(e) => setDataHoje(e.target.value)}
              />
              <button className="Close" onClick={() => setMostrarAlert(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="editar-fechar"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </nav>

            <div className="CabrasName">
              <div className="colun">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            <div className="SelectType">
              <div className="CPFInput">
                <label htmlFor="inputDoc">CPF:</label>
                <br />
                <input
                  type="text"
                  id="inputDoc"
                  value={cpf}
                  onChange={handleChangeCPF}
                  maxLength={14}
                />
              </div>

              <div className="PhoneArea">
                <label htmlFor="telefone">Telefone: </label>
                <br />
                <input
                  type="text"
                  id="telefone"
                  value={telefone}
                  onChange={handleChangeTelefone}
                  maxLength={17}
                />
              </div>
            </div>

            <div className="Observações">
              <div className="caixaObs">
                <nav className="obs">Observação</nav>
                <textarea
                  id="Detalhes"
                  value={obs}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>

              <div className="tadificil">
                <h3>enviar</h3>
                <button className="enviar" type="submit">
                  <svg
                    className="imagemAdd bi bi-person-fill-add"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="SaidaInfo">
              <strong>Saída</strong>
            </div>
            <p>
              Caso a pessoa já tenha saído: <br />
              Aperte o botão de "<strong>Registrar Saída</strong>" <br />
              Isso irá salvar a saída da pessoa.
            </p>
            <div className="hellYeah">
              <button id="RegistrarSaida">Registrar Saída</button>
            </div>
          </form>
        </div>
      )}

      {mostrarAlertaComponente && (
        <Alerta
          mensagem={msgAlertaComponente}
          onClick={() => setMostrarAlertaComponente(false)}
        />
      )}
    </>
  );
}
