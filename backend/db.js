// backend/db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1", // ou nome do container no Docker (ex: 'db')
  user: "root",
  password: "Mudar@1234",
  database: "mydb",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = connection;
