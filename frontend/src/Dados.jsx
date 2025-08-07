import { createContext, useContext, useEffect, useState } from "react";

const VisitasContext = createContext();

export function VisitasProvider({ children }) {
  const [dado, setDado] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/visitas/andrei")
      .then((response) => response.json())
      .then((data) => {
        setDado(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar visitas:", error);
      });
  }, []);

  return (
    <VisitasContext.Provider value={dado}>{children}</VisitasContext.Provider>
  );
}

export function useVisitas() {
  return useContext(VisitasContext);
}
