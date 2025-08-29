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
        v.DateTimeEntrada
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
router.post("/entrada", async (req, res) => {
  const { Nome, Cpf, Telefone, Observacao } = req.body;

  if (!Nome || !Cpf)
    return res.status(400).json({ error: "Nome é obrigatório" });

  try {
    const hora = new Date();
    const horaExata = hora.toISOString().slice(0, 19).replace("T", " ");

    const [pessoaSql] = await db.query(
      `INSERT INTO pessoa AND visita (Nome, Cpf, Telefone, Observacao, DateTimeEntrada) VALUES (?, ?, ?, ?, ?) WHERE idPessoa=Pessoa.idPessoa;
      
      SET @ultimo_id = LAST_INSERT_ID();

      INSERT INTO visita (Pessoa_idPessoa, DateTimeEntrada)
      VALUES (@ultimo_id, ?);`,
      [Nome, Cpf, Telefone, Observacao, horaExata]
    );

    if (pessoaSql.affectedRows > 0) {
      res.json({ message: "Visita Cadastrada! >:)" });
    } else {
      res.status(404).json({ message: "Visita não conseguiu cadastrada" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar visita" });
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

module.exports = router;
