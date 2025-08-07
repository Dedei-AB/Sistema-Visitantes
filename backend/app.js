const express = require("express");
const app = express();
const db = require("./db");
const objetoRoutes = require("./routes/visitas");

app.use(express.json());

app.use(express.json());
app.use("/visitas", objetoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
