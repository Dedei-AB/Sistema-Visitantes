import React, { useState, useEffect } from "react";
import "./Css/App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";
import ListaCadastrados from "./ListaCadastrados";
import BuscaPorPessoas from "./BuscaPorPessoas";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function MouseMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", MouseMove);
    return () => window.removeEventListener("mousemove", MouseMove);
  }, []);

  const [pessoasDentro, setPessoasDentro] = useState();

  const removerPessoa = (id) => {
    setPessoasDentro((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="app-layout">
      <div
        id="mouse"
        style={{
          left: pos.x,
          top: pos.y,
        }}
      ></div>

      <NovaPessoa
        onAddPessoa={(pessoa) => setPessoasDentro((prev) => [...prev, pessoa])}
      />
      <div className="busca">
        <ListaPresentes pessoas={pessoasDentro} onSaida={removerPessoa} />
        <ListaCadastrados />
      </div>
    </div>
  );
}

export default App;
