// routes/visitas.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar visitas já concluídas
router.get("/pessoa_visita", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.idPessoa, 
        p.Nome, 
        p.Cpf,
        p.Telefone,
        v.DateTimeEntrada,
        v.DateTimeSaida
      FROM pessoa p
      JOIN visitas v 
        ON p.idPessoa = v.Pessoa_idPessoa
      WHERE v.DateTimeEntrada IS NOT NULL
        AND v.DateTimeSaida IS NOT NULL;
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no banco de dados!");
  }
});

// Listar pessoas atualmente na câmara
router.get("/pessoa_camara", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.idPessoa, 
        v.idVisitas,
        p.Nome, 
        p.Cpf, 
        v.DateTimeEntrada, 
        p.Telefone, 
        p.Observacao
      FROM pessoa p
      JOIN visitas v 
        ON p.idPessoa = v.Pessoa_idPessoa
      WHERE v.DateTimeSaida IS NULL;
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no banco de dados!");
  }
});
//
//
//
//
//
// Registrar entrada
router.post("/entrada_de_pessoas", async (req, res) => {
  const { Nome, Cpf, Telefone, Observacao, DateTimeEntrada } = req.body;

  if (!Nome) {
    return res.status(400).json({ error: "Nome é uma área obrigatória" });
  }

  console.log("Recebido DateTimeEntrada:", DateTimeEntrada); // Log para depuração

  try {
    const [result] = await db.query(
      "INSERT INTO pessoa (Nome, Cpf, Telefone, Observacao) VALUES (?,?,?,?) ",
      [Nome, Cpf, Telefone, Observacao]
    );

    const pessoaId = result.insertId;

    await db.query(
      `INSERT INTO visitas ( Pessoa_idPessoa, DateTimeEntrada) VALUES ( ?, ?)`,
      [pessoaId, DateTimeEntrada]
    );
    res
      .status(201)
      .json({ message: "Pessoa Cadastrada com Sucesso", id: pessoaId });
  } catch (err) {
    console.error("Erro no backend:", err);
    res.status(500).json({ error: "Erro ao Cadastrar Pessoa" });
  }
});
//
//
//
//
// Registrar saída
router.post("/finalizar/:id", async (req, res) => {
  try {
    const idVisita = req.params.id;

    // Pega a hora atual
    const agora = new Date();
    const formatado = agora.toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      `UPDATE visitas SET DateTimeSaida = ? WHERE idVisitas = ? AND DateTimeSaida IS NULL`,
      [formatado, idVisita]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Visita finalizada com sucesso!" });
    } else {
      res
        .status(404)
        .json({ message: "Visita não encontrada ou já finalizada." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao finalizar visita." });
  }
});

// Select para editar pessoa:
router.get("/pessoa/:id", async (req, res) => {
  try {
    const idPessoa = Number(req.params.id);
    const [result] = await db.query(
      `
      SELECT * FROM pessoa WHERE idPessoa = ?;
    `,
      [idPessoa]
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no banco de dados!");
  }
});
//
//
//
//
// Editar Pessoa:
router.post("/pessoas/editar/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, observacao } = req.body;

    // Atualiza os dados no banco de dados
    const query = `
      UPDATE pessoa
      SET nome = ?, cpf = ?, telefone = ?, observacao = ?
      WHERE idPessoa = ?
    `;

    const [resultado] = await db.execute(query, [
      nome,
      cpf,
      telefone,
      observacao,
      id,
    ]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    res.json({ message: "Pessoa atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
module.exports = router;
