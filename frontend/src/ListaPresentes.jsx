import React from "react";
import "./ListaPresentes.css";

export default function PessoasPresentes({ pessoas, onSaida }) {
  return (
    <div className="container-lista-presenca">
      <h3>Visitantes Presentes: 3</h3>
      {pessoas.length === 0 ? (
        <p>Nenhum visitante.</p>
      ) : (
        pessoas.map((pessoa) => (
          <div key={pessoa.id} className="item-pessoa">
            <p><strong>Nome:</strong> {pessoa.nome}</p>
            <p><strong>CPF:</strong> {pessoa.cpf}</p>
            <p><strong>Entrada:</strong> {pessoa.horaEntrada}</p>
            <button onClick={() => onSaida(pessoa.id)}>Registrar Saída</button>
          </div>
        ))
      )}
    </div>
  );
}

