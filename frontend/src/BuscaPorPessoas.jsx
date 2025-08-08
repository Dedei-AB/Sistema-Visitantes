import "./BuscaPorPessoas.css";

export default function BuscaPorPessoas() {
  return (
    <div className="caixa-busca">
      <h2>Pessoas que ja Visitaram</h2>
      <input
        type="text"
        className="buscar-pessoa"
        placeholder="Pesquisar pessoa..."
      />
    </div>
  );
}
