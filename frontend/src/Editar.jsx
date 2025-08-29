import { useEffect, useState } from "react";
import "./Css/Editar.css";

export default function Editar({ idPessoa, onClick }) {
  const [dado, setDado] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/visitas/pessoa/${idPessoa}`)
      .then((response) => response.json())
      .then((data) => {
        setDado(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar visitas:", error);
      });
  }, [idPessoa]);

  useEffect(() => {
    if (dado.length > 0) {
      setNome(dado[0].Nome);
      setCpf(dado[0].Cpf);
      setTelefone(dado[0].Telefone);
      setObservacao(dado[0].Observacao);
    }
  }, [dado]);

  return (
    <div className="editar-container">
      <div className="editar-caixa">
        <nav className="editar-nav">
          <h2 className="editar-titulo">Editar Infomações de: {nome}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="editar-fechar"
            onClick={onClick}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </nav>
        <div className="editar-informacoes">
          <div className="editar-input-nome">
            <label htmlFor="nome">Nome:</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
