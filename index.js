// config inicial
require("dotenv").config(); // importa o dotenv para usar as variaveis de ambiente
const express = require("express"); // importa a pasta express dos node_modules
const mongoose = require("mongoose"); // importa a pasta mongoose dos node_modules
const app = express(); // cria uma instancia do express


// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    // middleware para ler o body da requisição e transformar em JSON
    extended: true,
  })
);

app.use(express.json()); // middleware para ler o body da requisição e transformar em JSON

// rotas da API
const personRoutes = require("./routes/personRoutes"); // importa as rotas de personRoutes

app.use("/person", personRoutes); // middleware para usar as rotas de personRoutes

// rota inicial / endpoint
app.get("/", (req, res) => {
  // mostrar req

  res.json({ message: "Hello World" });
});

// dotenv
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// entregar uma porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.favsa0t.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(3000);
  })
  .catch((err) => console.log(err));


