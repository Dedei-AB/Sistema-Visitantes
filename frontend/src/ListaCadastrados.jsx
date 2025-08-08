import { useState } from "react";
import { useVisitas } from "./Dados";
import "./ListaCadastrados.css";

function ListaCadastrados() {
  const [aberto, setAberto] = useState(false);
  const { visita, setVisita } = useVisitas();

  return (
    <div className="container-cadastro">
      <h2>Visitas cadastradas:</h2>
      <p>{visita.length}</p>

      <h2>Visitas:</h2>

      <div className="tabela-lista-cadastrados">
        <table>
          <thead>
            <tr>
              <th>Nome:</th>
              <th>Data de Entrada:</th>
              <th>Hora de Entrada:</th>
            </tr>
          </thead>
          <tbody>
            {visita.map((pessoa, index) => {
              return (
                <tr key={index}>
                  <th>{pessoa.Nome}</th>
                  <th>
                    {new Date(pessoa.DataEntrada).toLocaleDateString("pt-BR")}
                  </th>
                  <th>{pessoa.HoraEntrada}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaCadastrados;
