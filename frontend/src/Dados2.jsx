import { createContext, useContext, useEffect, useState } from "react";

const VisitasContext = createContext();

export function VisitasProvider({ children }) {
  const [dado, setDado] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/visitas/pessoa_camara")
      .then((response) => response.json())
      .then((data) => {
        setDado(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar visitas:", error);
      });
  }, []);

  return (
    <VisitasContext.Provider value={{ visita: dado, setVisita: setDado }}>
      {children}
    </VisitasContext.Provider>
  );
}

export function useVisitas() {
  return useContext(VisitasContext);
}
