import React, { useState } from "react";
import "./NovaPessoa.css";

export default function NovaPessoa({ children, onClick, ...props }) {
  const [mostrarAlert, setMostrarAlert] = useState(false);

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
            <div className="boxAlert">cccccccccccccccccccccc</div>
          </div>
        )}
      </div>
    </>
  );
}
