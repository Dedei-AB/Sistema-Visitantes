import React, { useState } from "react";
import "./App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";

function App() {
  const [pessoasDentro, setPessoasDentro] = useState([
    {
      id: 1,
      nome: "Maria Macedo",
      cpf: "111.456.999-00",
      horaEntrada: "09:15",
      observacao: "Cabelo castanho",
    },
    { id: 2, nome: "Maria Souza", cpf: "222.654.111-00", horaEntrada: "09:45",
      observacao: "Cabelo loiro",
     },
    {
      id: 3,
      nome: "Fulano Oliveira",
      cpf: "222.654.333-00",
      horaEntrada: "09:45",
      observacao: "Cabelo castanho",
    },
    {
      id: 4,
      nome: "Lorenzo cordeiro",
      cpf: "222.654.123-00",
      horaEntrada: "10:20",
      observacao: "Careca",
    },
    {
      id: 5,
      nome: "Edina Silva",
      cpf: "2.654.333-00",
      horaEntrada: "09:45",
      observacao: "Cabelo castanho",
    },
  ]);

  const removerPessoa = (id) => {
    setPessoasDentro((prev) => prev.filter((p) => p.id !== id));
  };

  const caixasDeInformacao = [
    {
      id: "1",
      tipo: "info",
      titulo: "Usuários Ativos",
      valor: "30",
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
    <div className="app-layout">
      <div className="lado-esquerdo">
        <NovaPessoa />
      </div>
      <ListaPresentes pessoas={pessoasDentro} onSaida={removerPessoa} />
    </div>
  );
}

export default App;
