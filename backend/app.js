// app.js
import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: "10.1.150.10", // IP do servidor Docker
  user: "Admin",
  password: "Mudar@1234",
  database: "sistemavisita",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

app.get("/objetos", (req, res) => {
  db.query("SELECT * FROM objetos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
