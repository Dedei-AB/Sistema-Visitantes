import React, { useEffect, useState } from "react";

import "./NovaPessoa.css";

export default function NovaPessoa({ children, onClick, ...props }) {
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [dataHoje, setDataHoje] = useState("");
  const [horaExata, setHoraExata] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11); // Máximo 11 dígitos

    if (numeros.length === 0) return "";

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(
        3,
        7
      )}-${numeros.slice(7)}`;
    }

    return numeros;
  };

  const handleChange3 = (e) => {
    const telefoneFormatado = formatarTelefone(e.target.value);
    setTelefone(telefoneFormatado);
  };

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    let formatado = numeros;

    if (numeros.length > 3) {
      formatado = numeros.slice(0, 3) + "." + numeros.slice(3);
    }
    if (numeros.length > 6) {
      formatado = formatado.slice(0, 7) + "." + formatado.slice(7);
    }
    if (numeros.length > 9) {
      formatado = formatado.slice(0, 11) + "-" + formatado.slice(11);
    }

    return formatado;
  };

  const handleChange2 = (e) => {
    const valorFormatado = formatarCPF(e.target.value);
    setCpf(valorFormatado);
  };

  function pegarHora() {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    return `${hora}:${minutos}`;
  }

  useEffect(() => {
    function catchDay() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    setDataHoje(catchDay());
  }, []);

  const handleClick = (e) => {
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

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });

    if (onClick) onClick(e);
  };

  return (
    <>
      <div className="caixa-resumo">
        <button
          className="AdicionarBtn1"
          onClick={(e) => {
            handleClick(e);
            setMostrarAlert(true);
            setHoraExata(pegarHora());
          }}
          {...props}
        >
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
                  value={horaExata}
                  onClick={handleClick}
                  onChange={(e) => setHoraExata(e.target.value)}
                />
                <input
                  type="date"
                  value={dataHoje}
                  onClick={handleClick}
                  onChange={(e) => setDataHoje(e.target.value)}
                />
                <button
                  className="Close"
                  onClick={(e) => {
                    setMostrarAlert(false);
                    handleClick(e);
                  }}
                >
                  <strong className="x">x</strong>
                </button>
              </nav>
              <div className="CabrasName">
                <div className="colun">
                  <label htmlFor="">Nome - </label>

                  <input type="text" id="nome" />
                </div>

                <div className="colun">
                  <label htmlFor="">Sobrenome - </label>
                  <input type="text" id="sobrenome" />
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
                    onChange={handleChange2}
                    maxLength={14} // xxx.xxx.xxx-xx = 14 caracteres
                  />
                </div>
                <div className="PhoneArea">
                  <label htmlFor="telefone">Telefone -</label>
                  <br />
                  <input
                    type="text"
                    id="telefone"
                    value={telefone}
                    onChange={handleChange3}
                    maxLength={17}
                  />
                </div>
              </div>

              <div className="Observações">
                <div className="caixaObs">
                  <nav className="obs">Observações</nav>
                  <textarea name="" id="Detalhes"></textarea>
                </div>
                <div className="tadificil">
                  <button className="enviar">
                    <svg
                      className="imagemAdd"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
