import React, {useState} from "react";
import "./ListaPresentes.css";

export default function PessoasPresentes({ pessoas, onSaida }) {
  const [busca, setBusca] = useState("");

  const barraPesquisa = pessoas.filter((pessoa) => pessoa.nome.toLowerCase().includes(busca.toLowerCase())
);

  return (
    <div className="container-lista-presenca">
      <h2 className="titulo">Visitantes Presentes: </h2>

      <input type="text" placeholder="Pesquisar..." className="campo-pesquisa"
      value={busca} onChange={(e) => setBusca(e.target.value)}/>

      {barraPesquisa.length === 0 ? (
        <p className="nenhum-visitante">Nenhuma pessoa encontrada.</p>
      ) : (
      <div className="lista-pessoas">
        {barraPesquisa.map((pessoa) => (
          <div key={pessoa.id} className="caixa-pessoa">
            <div>
              <p><strong>Nome:</strong> {pessoa.nome}</p>
              <p><strong>CPF:</strong> {pessoa.cpf}</p>
              <p><strong>Entrada:</strong> {pessoa.horaEntrada}</p>
              <p><strong>Observação:</strong> {pessoa.observacao}</p>
              <p><strong>telefone:</strong> {pessoa.telefone}</p>
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

