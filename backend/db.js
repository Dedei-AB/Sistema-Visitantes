// backend/db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "10.1.150.10", // ou nome do container no Docker (ex: 'db')
  user: "root",
  password: "root",
  database: "sistemaVisita",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = connection;
