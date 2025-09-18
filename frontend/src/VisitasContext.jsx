// VisitasContext.jsx
import { createContext, useState, useEffect } from "react";

export const VisitasContext = createContext();

export function VisitasProvider({ children }) {
  const [visitantes, setVisitantes] = useState([]);
  const [pessoaCadastrada, setPessoaCadastrada] = useState([]);

  // Função para carregar visitantes
  const carregarVisitantes = async () => {
    try {
      const res = await fetch("http://localhost:5000/visitas/pessoa_camara");
      const data = await res.json();
      setVisitantes(data);
    } catch (err) {
      console.error("Erro ao buscar visitantes:", err);
    }
  };

  // Função para carregar pessoas cadastradas
  const carregarPessoaCadastrada = async () => {
    try {
      const res = await fetch("http://localhost:5000/visitas/pessoa_visita");
      const data = await res.json();
      setPessoaCadastrada(data);
    } catch (err) {
      console.error("Erro ao buscar pessoas cadastradas:", err);
    }
  };

  // Buscar os dados ao montar
  useEffect(() => {
    carregarVisitantes();
    carregarPessoaCadastrada();
  }, []);

  return (
    <VisitasContext.Provider
      value={{
        visitantes,
        setVisitantes,
        pessoaCadastrada,
        setPessoaCadastrada,
        carregarVisitantes,
        carregarPessoaCadastrada,
      }}
    >
      {children}
    </VisitasContext.Provider>
  );
}
