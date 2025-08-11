const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/pessoa_visita", (req, res) => {
  db.query(
    `SELECT DISTINCT p.idPessoa, p.Nome, p.Cpf
FROM pessoa p
JOIN visitas v ON p.idPessoa = v.Pessoa_idPessoa
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
    `SELECT idPessoa, Nome, Cpf, DataEntrada, HoraEntrada from pessoa, visitas
WHERE idPessoa = Pessoa_idPessoa and (DataSaida is null or HoraSaida is null);`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!");
      res.json(results);
    }
  );
});

module.exports = router;
