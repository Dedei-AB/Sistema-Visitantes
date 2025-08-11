import React, { useState, useEffect } from "react";
import "./App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";
import { VisitasProvider } from "./Dados";
import ListaCadastrados from "./ListaCadastrados";
import BuscaPorPessoas from "./BuscaPorPessoas";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pessoasDentro, setPessoasDentro] = useState([]); // Estado para lista

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const angle =
    (Math.atan2(
      mousePosition.y - window.innerHeight / 2,
      mousePosition.x - window.innerWidth / 2
    ) *
      180) /
      Math.PI +
    90;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(${angle}deg, rgba(185, 67, 67, 1) 0%, rgba(255, 255, 255, 1) 100%)`,
  };

  const removerPessoa = (id) => {
    setPessoasDentro((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <VisitasProvider>
      <div className="app-layout" style={backgroundStyle}>
        <div className="lado-esquerdo">
          {/* Passa a função para adicionar pessoa */}
          <NovaPessoa
            onAddPessoa={(pessoa) =>
              setPessoasDentro((prev) => [...prev, pessoa])
            }
          />
          <div className="busca">
            <ListaPresentes pessoas={pessoasDentro} onSaida={removerPessoa} />
            <ListaCadastrados />
            <BuscaPorPessoas />
          </div>
        </div>
      </div>
    </VisitasProvider>
  );
}

export default App;
