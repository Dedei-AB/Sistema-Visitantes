import React, { useState, useEffect } from "react";
import "./Css/App.css";
import NovaPessoa from "./NovaPessoa";
import ListaPresentes from "./ListaPresentes";
import ListaCadastrados from "./ListaCadastrados";
import BuscaPorPessoas from "./BuscaPorPessoas";

function App() {
  return (
    <div className="app-layout">
      <NovaPessoa />
      <div className="busca">
        <ListaPresentes />
        <ListaCadastrados />
      </div>
    </div>
  );
}

export default App;
