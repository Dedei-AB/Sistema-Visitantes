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

  const [pessoasDentro, setPessoasDentro] = useState([
    {
      id: 1,
      nome: "Maria Eduarda Macedo de Souza",
      cpf: "111.456.999-00",
      horaEntrada: "09:15",
      observacao: "Foi falar com o Macedo",
      telefone: "99813-4721",
    },
    {
      id: 2,
      Nome: "Maria Souza",
      Cpf: "222.654.111-00",
      horaEntrada: "09:45",
      observacao: "Cabelo loiro",
      telefone: "99813-4721",
    },
  ]);

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
