import React, { useState, useEffect } from "react";
import "./App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";
import { VisitasProvider } from "./Dados";
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
      nome: "Maria Souza",
      cpf: "222.654.111-00",
      horaEntrada: "09:45",
      observacao: "Cabelo loiro",
      telefone: "99813-4721",
    },
    {
      id: 3,
      nome: "Fulano Oliveira",
      cpf: "222.654.333-00",
      horaEntrada: "09:45",
      observacao: "Cabelo castanho",
      telefone: "99813-4721",
    },
    {
      id: 4,
      nome: "Lorenzo cordeiro",
      cpf: "222.654.123-00",
      horaEntrada: "10:20",
      observacao: "Careca",
      telefone: "99813-4721",
    },
    {
      id: 5,
      nome: "Lorenzo cordeiro",
      cpf: "222.654.123-00",
      horaEntrada: "10:20",
      observacao: "Careca",
      telefone: "99813-4721",
    },
  ]);

  const removerPessoa = (id) => {
    setPessoasDentro((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <VisitasProvider>
      <div className="app-layout">
        <div
          id="mouse"
          style={{
            left: pos.x,
            top: pos.y,
          }}
        ></div>
        <div className="lado-esquerdo">
          <div className="botaoAdd">
            {/* Passa a função para adicionar pessoa */}
            <NovaPessoa
              onAddPessoa={(pessoa) =>
                setPessoasDentro((prev) => [...prev, pessoa])
              }
            />
          </div>

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
