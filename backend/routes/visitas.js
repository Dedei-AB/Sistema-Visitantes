const express = require("express");
const router = express.Router();
const db = require("../db");

// listar visitas já concluídas
router.get("/pessoa_visita", (req, res) => {
  db.query(
    `SELECT 
      p.idPessoa, 
      p.Nome, 
      p.Cpf, 
      v.DateTimeEntrada
    FROM pessoa p
    JOIN visitas v 
      ON p.idPessoa = v.Pessoa_idPessoa
    WHERE v.DateTimeEntrada IS NOT NULL
      AND v.DateTimeSaida IS NOT NULL;`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!");
      res.json(results);
    }
  );
});

// listar pessoas atualmente na câmara
router.get("/pessoa_camara", (req, res) => {
  db.query(
    `SELECT 
      p.idPessoa, 
      p.Nome, 
      p.Cpf, 
      v.DateTimeEntrada, 
      p.Telefone, 
      p.Observacao
    FROM pessoa p
    JOIN visitas v 
      ON p.idPessoa = v.Pessoa_idPessoa
    WHERE v.DateTimeSaida IS NULL;`,
    (err, results) => {
      if (err) return res.status(500).send("Erro no banco de dados!");
      res.json(results);
    }
  );
});

// registrar entrada
router.post("/entrada", (req, res) => {
  const { Nome, Cpf, Telefone, Observacao, DataEntrada, HoraEntrada } =
    req.body;

  if (!Nome || !Cpf)
    return res.status(400).json({ error: "Nome e CPF são obrigatórios" });

  const pessoaSql = `
    INSERT INTO pessoa (Nome, Cpf, Telefone, Observacao)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE Nome=VALUES(Nome), Telefone=VALUES(Telefone), Observacao=VALUES(Observacao)
  `;

  db.query(pessoaSql, [Nome, Cpf, Telefone, Observacao], (err, results) => {
    if (err) {
      console.error("Erro insert pessoa:", err);
      return res.status(500).json({ error: "Erro ao salvar pessoa" });
    }

    const getIdSql = `SELECT idPessoa FROM pessoa WHERE Cpf=?`;
    db.query(getIdSql, [Cpf], (err2, rows) => {
      if (err2) return res.status(500).json({ error: "Erro ao buscar pessoa" });
      if (!rows || rows.length === 0)
        return res
          .status(500)
          .json({ error: "Pessoa não encontrada após insert" });

      const idPessoa = rows[0].idPessoa;
      const visitaSql = `INSERT INTO visitas (Pessoa_idPessoa, DataEntrada, HoraEntrada) VALUES (?, ?, ?)`;

      db.query(
        visitaSql,
        [idPessoa, DataEntrada, HoraEntrada],
        (err3, result2) => {
          if (err3) {
            console.error("Erro insert visitas:", err3);
            return res.status(500).json({ error: "Erro ao salvar visita" });
          }

          res.status(200).json({
            message: "Entrada registrada!",
            idVisita: result2.insertId,
          });
        }
      );
    });
  });
});

// registrar saída
router.post("/saida", (req, res) => {
  const { cpf, dataSaida, horaSaida } = req.body;
  if (!cpf) return res.status(400).json({ error: "Informe o CPF" });

  const updateSql = `
    UPDATE visitas v
    JOIN pessoa p ON v.Pessoa_idPessoa = p.idPessoa
    SET v.DataSaida=?, v.HoraSaida=?
    WHERE p.Cpf=? AND v.DataSaida IS NULL AND v.HoraSaida IS NULL
    ORDER BY v.idVisitas DESC
    LIMIT 1
  `;

  db.query(updateSql, [dataSaida, horaSaida, cpf], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao registrar saída" });
    res.status(200).json({ message: "Saída registrada!" });
  });
});

module.exports = router;
