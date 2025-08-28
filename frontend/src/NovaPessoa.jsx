import React, { useRef, useEffect, useState } from "react";
import "./Css/NovaPessoa.css";

export default function NovaPessoa({ onAddPessoa, ...props }) {
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const [mostrarAlert, setMostrarAlert] = useState(false);
  //------------Informações-----------------------
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [obs, setObservacao] = useState("");
  //------------Horario--------------------------
  const [dataHoje, setDataHoje] = useState("");
  const [horaExata, setHoraExata] = useState("");
  const [dateTimeEntrada, setDateTimeEntrada] = useState("");

  const pegarHora = () => {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");
    return `${hora}:${minutos}:${segundos}`;
  };

  function handleKeyDown(e, index) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      if (index < inputRefs.length - 1) inputRefs[index + 1].current.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (index > 0) inputRefs[index - 1].current.focus();
    }
  }

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
    let formatado = numeros;
    if (numeros.length > 3)
      formatado = numeros.slice(0, 3) + "." + numeros.slice(3);
    if (numeros.length > 6)
      formatado = formatado.slice(0, 7) + "." + formatado.slice(7);
    if (numeros.length > 9)
      formatado = formatado.slice(0, 11) + "-" + formatado.slice(11);
    return formatado;
  };

  const handleChangeTelefone = (e) =>
    setTelefone(formatarTelefone(e.target.value));
  const handleChangeCPF = (e) => setCpf(formatarCPF(e.target.value));

  const handleClickBtn = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    setMostrarAlert(true);
    setHoraExata(pegarHora());

    const agora = new Date();
    const horaAtual = pegarHora();
    setHoraExata(horaAtual);

    const dataAtual = agora.toISOString().split("T")[0];
    setDataHoje(dataAtual);

    const [hora, minuto, segundo = "00"] = horaAtual.split(":");
    agora.setHours(hora, minuto, segundo, 0);
    setDateTimeEntrada(agora.toISOString());

    console.log("DateTimeEntrada:", agora.toISOString());
  };

  const handleEnviar = () => {
    console.log("Função handleEnviar chamada");
  };

  const registrarSaida = () => {
    console.log("Função registrarSaida chamada");
  };
  //-------------- Saida de Visitas --------------

  return (
    <>
      <div className="caixa-resumo">
        <button className="AdicionarBtn1" onClick={handleClickBtn} {...props}>
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

        {mostrarAlert && (
          <div className="bottomAlert">
            <div className="boxAlert">
              <nav>
                <input
                  type="time"
                  step={1}
                  value={horaExata}
                  onChange={(e) => setHoraExata(e.target.value)}
                  onClick={handleClickBtn}
                />
                <input
                  type="date"
                  value={dataHoje}
                  onChange={(e) => setDataHoje(e.target.value)}
                  onClick={handleClickBtn}
                />
                <button
                  className="Close"
                  onClick={() => setMostrarAlert(false)}
                >
                  <strong className="x">x</strong>
                </button>
              </nav>

              <div className="CabrasName">
                <div className="colun">
                  <label htmlFor="nome">Nome - </label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    ref={inputRefs[0]}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                  />
                </div>

                <div className="colun">
                  <label htmlFor="sobrenome">Sobrenome - </label>
                  <input
                    type="text"
                    id="sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    ref={inputRefs[1]}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                  />
                </div>
              </div>

              <div className="SelectType">
                <div className="CPFInput">
                  <label htmlFor="inputDoc">CPF -</label>
                  <br />
                  <input
                    type="text"
                    id="inputDoc"
                    value={cpf}
                    onChange={handleChangeCPF}
                    maxLength={14}
                    ref={inputRefs[2]}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                  />
                </div>

                <div className="PhoneArea">
                  <label htmlFor="telefone">Telefone -</label>
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
                  <button className="enviar" onClick={handleEnviar}>
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
                {/* >>> aqui liga a função nova */}
                <button id="RegistrarSaida" onClick={registrarSaida}>
                  Registrar Saída
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
