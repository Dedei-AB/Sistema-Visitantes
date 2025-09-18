import { useEffect, useState } from "react";
import Pessoas from "./Pessoas";
import "./Css/ListaCadastrados.css";
import "react-date-range/dist/styles.css"; // estilo principal
import "react-date-range/dist/theme/default.css"; // tema default
import FiltroCalendario from "./FiltroCalendario";
import Editar from "./Editar";
import { VisitasContext } from "./VisitasContext";
import { useContext } from "react";

function ListaCadastrados() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const { pessoaCadastrada } = useContext(VisitasContext);
  const [busca, setBusca] = useState("");

  const removerAcentos = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const mudarPessoa = (texto, idPessoa) => {
    console.log(texto);
    setPessoaSelecionada(idPessoa);
    setShowEditar(true);
  };

  const dadosFiltrados = pessoaCadastrada.filter((pessoa) => {
    const dataEntrada = new Date(pessoa.DateTimeEntrada);
    const startDate = periodoSelecionado
      ? new Date(periodoSelecionado.startDate)
      : null;
    const endDate = periodoSelecionado
      ? new Date(periodoSelecionado.endDate)
      : null;
    if (endDate) endDate.setHours(23, 59, 59, 999); //inclue o dia inteiro

    const dentroDoPeriodo =
      !periodoSelecionado ||
      (dataEntrada >= startDate && dataEntrada <= endDate);

    const buscaEhNumerica = /^\d+$/.test(busca.replace(/\D/g, "")); //verifica se a busca é numérica(provavelmente CPF) ou texto(nome)
    const nome = pessoa.Nome || "";
    const cpf = (pessoa.Cpf || "").replace(/\D/g, "");

    const termoBusca = removerAcentos(busca.toLowerCase());
    const nomeNormalizado = removerAcentos(nome.toLowerCase());

    const termoNumerico = busca.replace(/\D/g, "");

    const correspondeBusca = buscaEhNumerica
      ? cpf.includes(termoNumerico)
      : nomeNormalizado.includes(termoBusca);

    return dentroDoPeriodo && correspondeBusca;
  });

  // useEffect(() => {
  //   fetch("http://localhost:5000/visitas/pessoa_visita")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDado(data);
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao buscar visitas:", error);
  //     });
  // }, []);

  return (
    <div className="container-cadastro">
      <h2 className="titulo-cadastrados">Visitas cadastradas:</h2>
      <input
        type="text"
        className="busca-lista-cadastro"
        placeholder="Pesquisar nome ou CPF..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <FiltroCalendario onPeriodoChange={setPeriodoSelecionado} />

      <div className="tabela-lista-cadastrados">
        {dadosFiltrados.map((pessoa, index) => {
          return (
            <Pessoas
              key={index}
              visitas={pessoa}
              editar={() => {
                mudarPessoa(
                  `Você clicou na pessoa: ${pessoa.Nome}`,
                  pessoa.idPessoa
                );
              }}
            />
          );
        })}
      </div>

      {showEditar && (
        <Editar
          onClick={() => setShowEditar(false)}
          idPessoa={pessoaSelecionada}
        />
      )}
    </div>
  );
}

export default ListaCadastrados;
