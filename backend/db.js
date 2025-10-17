import dotenv from "dotenv";
const mysql = require("mysql2");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "sistemaVisita",
  timezone: "Z",
});

const db = connection.promise();

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = db;
