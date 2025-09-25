import { useRef, useEffect, useState } from "react";
import style from "./Css/Editar.module.css";
import Alerta from "./Alerta";
import { set } from "date-fns";
import { VisitasContext } from "./VisitasContext";
import { useContext } from "react";

export default function Editar({ idPessoa, onClick }) {
  const [msgAlerta, setMsgAlerta] = useState("Aguarde...");

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const [inicialNome, setinicialNome] = useState("");
  const [inicialCpf, setinicialCpf] = useState("");
  const [inicialTelefone, setinicialTelefone] = useState("");
  const [inicialObservacao, setinicialObservacao] = useState("");
  const [inicialdataEntrada, setinicialDataEntrada] = useState("");
  const [inicialDataSaida, setinicialDataSaida] = useState("");

  const [dado, setDado] = useState([]);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");

  const { carregarPessoaCadastrada } = useContext(VisitasContext);

  const handleChangeCPF = (e) => setCpf(formatarCPF(e.target.value));
  const handleChangeTelefone = (e) =>
    setTelefone(formatarTelefone(e.target.value));

  const handleSalvar = async () => {
    // Monta o objeto com os dados atualizados
    if (!nome) {
      setMsgAlerta("O campo Nome é obrigatório!");
      setMostrarAlerta(true);
      return;
    }
    const pessoaAtualizada = {
      nome,
      cpf,
      telefone,
      observacao,
    };
    console.log(pessoaAtualizada);
    try {
      const response = await fetch(
        `http://localhost:5000/visitas/pessoas/editar/${idPessoa}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pessoaAtualizada),
        }
      );

      if (response.ok) {
        const resultado = await response.json();
        console.log("Pessoa atualizada:", resultado);
        setMsgAlerta("Dados atualizados com sucesso!");
        carregarPessoaCadastrada();
        setDado([
          {
            idPessoa: idPessoa,
            Nome: nome,
            Cpf: cpf,
            Telefone: telefone,
            Observacao: observacao,
          },
        ]);
      } else {
        console.error("Erro ao atualizar pessoa");
        setMsgAlerta("Erro ao atualizar pessoa!");
      }
    } catch (err) {
      setMsgAlerta("Erro ao atualizar pessoa!", err);
      console.error("Erro na requisição:", err);
    }
  };

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

      setinicialNome(nome);
      setinicialCpf(cpf);
      setinicialTelefone(telefone);
      setinicialObservacao(observacao);
    }
  }, [dado]);

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    let formatado = numeros;
    if (numeros.length > 3)
      formatado = numeros.slice(0, 3) + "." + numeros.slice(3);
    if (numeros.length > 6)
      formatado = formatado.slice(0, 7) + "." + formatado.slice(7);
    if (numeros.length > 9)
      formatado = formatado.slice(0, 11) + "-" + formatado.slice(11);
    return formatado;
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length === 0) return "";
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 11)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(
        3,
        7
      )}-${numeros.slice(7)}`;
    return numeros;
  };

  return (
    <div className={style["editar-container"]}>
      <div className={style["editar-caixa"]}>
        <nav className={style["editar-nav"]}>
          <h3 className={style["editar-titulo"]}>
            Editar Infomações de:{" "}
            {dado.length > 0 ? dado[0].Nome : "Aguarde..."}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={style["editar-fechar"]}
            onClick={onClick}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </nav>
        <div className={style["editar-informacoes"]}>
          <div className={style["editar-caixa-input"]}>
            <label htmlFor="nome">Nome:*</label>
            <input
              className={style["input-nome"]}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={style["editar-caixa-input"]}>
            <label htmlFor="cpf">Cpf:</label>
            <input
              type="text"
              value={cpf}
              onChange={handleChangeCPF}
              maxLength={14}
              placeholder="XXX.XXX.XXX-XX"
            />
          </div>

          <div className={style["editar-caixa-input"]}>
            <label htmlFor="cpf">Data de entrada:</label>
            <input
              type="date"
              className={style["input-date"]}
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              maxLength={14}
              placeholder="XXX.XXX.XXX-XX"
            />
          </div>

          <div className={style["editar-caixa-input"]}>
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={handleChangeTelefone}
              maxLength={17}
              placeholder="(XX) X XXXX-XXXX"
            />
          </div>

          <div className={style["editar-caixa-input"]}>
            <label htmlFor="observacao">Observação:</label>
            <textarea
              name="observacao"
              id="editar-input-observacao"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            ></textarea>
          </div>

          <div className={style["botoes"]}>
            <button
              className={style["btn-salvar"]}
              onClick={() => {
                handleSalvar();
                setMostrarAlerta(true);
              }}
            >
              <strong>Salvar</strong>
            </button>
            <button
              className={style["btn-reverter"]}
              onClick={() => {
                setCpf(inicialCpf);
                setNome(inicialNome);
                setObservacao(inicialObservacao);
                setTelefone(inicialTelefone);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="white"
                className={style["reverter-svg"]}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
              </svg>
              <strong>Reverter</strong>
            </button>
          </div>
        </div>
      </div>

      {mostrarAlerta && (
        <Alerta mensagem={msgAlerta} onClick={() => setMostrarAlerta(false)} />
      )}
    </div>
  );
}
