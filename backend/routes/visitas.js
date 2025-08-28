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

// Registrar entrada
router.post("/entrada", async (req, res) => {
  const { Nome, Cpf, Telefone, Observacao, DataEntrada, HoraEntrada } =
    req.body;

  if (!Nome || !Cpf)
    return res.status(400).json({ error: "Nome e CPF são obrigatórios" });

  try {
    const pessoaSql = `
      INSERT INTO pessoa (Nome, Cpf, Telefone, Observacao)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE Nome=VALUES(Nome), Telefone=VALUES(Telefone), Observacao=VALUES(Observacao)
    `;
    await db.query(pessoaSql, [Nome, Cpf, Telefone, Observacao]);

    const [rows] = await db.query(`SELECT idPessoa FROM pessoa WHERE Cpf=?`, [
      Cpf,
    ]);
    if (!rows || rows.length === 0)
      return res
        .status(500)
        .json({ error: "Pessoa não encontrada após insert" });

    const idPessoa = rows[0].idPessoa;
    const visitaSql = `INSERT INTO visitas (Pessoa_idPessoa, DataEntrada, HoraEntrada) VALUES (?, ?, ?)`;
    const [result2] = await db.query(visitaSql, [
      idPessoa,
      DataEntrada,
      HoraEntrada,
    ]);

    res.status(200).json({
      message: "Entrada registrada!",
      idVisita: result2.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar visita" });
  }
});

// Registrar saída
router.post("/finalizar/:id", async (req, res) => {
  try {
    const idVisita = req.params.id;

    // Pega a hora atual
    const agora = new Date();
    const formatado = agora.toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      `UPDATE visitas 
       SET DateTimeSaida = ? 
       WHERE idVisitas = ? AND DateTimeSaida IS NULL`,
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

module.exports = router;
