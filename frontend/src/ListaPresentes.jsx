import React from "react";
import "./ListaPresentes.css";

export default function PessoasPresentes({ pessoas, onSaida }) {
  return (
    <div className="container-lista-presenca">
      <h2 className="titulo">Visitantes Presentes: 3</h2>
      {pessoas.length === 0 ? (
        <p className="nenhum-visitante">Nenhum visitante.</p>
      ) : (
      <div className="lista-pessoas">
        {pessoas.map((pessoa) => (
          <div key={pessoa.id} className="caixa-pessoa">
            <div>
              <p><strong>Nome:</strong> {pessoa.nome}</p>
              <p><strong>CPF:</strong> {pessoa.cpf}</p>
              <p><strong>Entrada:</strong> {pessoa.horaEntrada}</p>
              <p><strong>Observação:</strong> {pessoa.observacao}</p>
            </div>
            <button onClick={() => onSaida(pessoa.id)} className="botao-saida">Registrar Saída</button>
          </div>
        ))}
      </div>
      )
      }
    </div>
  );
}

