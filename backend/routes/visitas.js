const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/pessoa_visita", (req, res) => {
  db.query(
    `SELECT 
    p.idPessoa, 
    p.Nome, 
    p.Cpf, 
    v.HoraEntrada, 
    v.DataEntrada
FROM pessoa p
JOIN visitas v 
    ON p.idPessoa = v.Pessoa_idPessoa
WHERE v.HoraEntrada IS NOT NULL
  AND v.HoraSaida IS NOT NULL;`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!");
      res.json(results);
    }
  );
});

router.get("/pessoa_camara", (req, res) => {
  db.query(
    `SELECT 
    p.idPessoa, 
    p.Nome, 
    p.Cpf, 
    v.DataEntrada, 
    v.HoraEntrada, 
    p.Telefone, 
    p.Observacao
FROM pessoa p
JOIN visitas v ON p.idPessoa = v.Pessoa_idPessoa
WHERE v.DataSaida IS NULL OR v.HoraSaida IS NULL;
;
`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!");
      res.json(results);
    }
  );
});

router.post("/nova_pessoa", (req, res) => {
  const { nome, cpf } = req.body;

  if (!nome || !cpf) {
    return res.status(400).send("Preencha todos os campos");
  }

  db.query(
    `INSERT INTO pessoa (Cpf, Nome, Sobrenome, Telefone, Observacao)
    VALUES (?, ?, ?, ?, ?)`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!!");
      res.json(results);
    }
  );
});

module.exports = router;
