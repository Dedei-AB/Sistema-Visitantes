import React, { useEffect, useState } from "react";
import "./NovaPessoa.css";

export default function NovaPessoa({ children, onClick, ...props }) {
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [dataHoje, setDataHoje] = useState("");
  const [horaExata, setHoraExata] = useState("");

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
                  onClick={() => {
                    setMostrarAlert(false);
                    handleClick(e);
                  }}
                >
                  <strong className="x">x</strong>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
