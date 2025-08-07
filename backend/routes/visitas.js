const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/andrei", (req, res) => {
  db.query(
    `SELECT idPessoa, Nome, Cpf, DataEntrada, HoraEntrada from pessoa, visitas
WHERE idPessoa = Pessoa_idPessoa;`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco");
      res.json(results);
    }
  );
});

module.exports = router;
