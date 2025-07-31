import React from "react";
import "./App.css";
import CaixasResumo from "./CaixaResumo";
import NovaPessoa from "./NovaPessoa";

function App() {
  const caixasDeInformacao = [
    {
      id: "1",
      tipo: "info",
      titulo: "Usuários Ativos",
      valor: "1.234",
      itens: ["João", "Maria", "Carlos"],
    },
    {
      id: "2",
      tipo: "alerta",
      titulo: "Pendências",
      valor: "5",
      itens: ["Pagamento 1", "Revisão 2", "Bug #123"],
    },
    {
      id: "3",
      tipo: "sucesso",
      titulo: "Projetos Concluídos",
      valor: "12",
    },
  ];

  return (
    <div className="app">
      <NovaPessoa />
      <CaixasResumo caixas={caixasDeInformacao} />
    </div>
  );
}

export default App;
