//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3005;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/eletronicoplus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const ProdutoeletronicoSchema = new mongoose.Schema({
  id_produtoeletronico: { type: String, required: true },
  descricao: { type: String },
  marca: { type: String },
  datafabricacao: { type: Date },
  anosgarantia: { type: Number },
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtoeletronico = mongoose.model(
  "Produtoeletronico",
  ProdutoeletronicoSchema
);

//configuração dos roteamendos

//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email: email,
    senha: senha,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

//rota de cadastro especifico
app.post("/cadastroprodutoeletronico", async (req, res) => {
  const id_produtoeletronico = req.body.id_produtoeletronico;
  const descricao = req.body.descricao;
  const marca = req.body.marca;
  const datafabricacao = req.body.datafabricacao;
  const anosgarantia = req.body.anosgarantia;

  const produtoeletronico = new Produtoeletronico({
    id_produtoeletronico: id_produtoeletronico,
    descricao: descricao,
    marca: marca,
    datafabricacao: datafabricacao,
    anosgarantia: anosgarantia
  });

  try {
    const newProdutoeletronico = await produtoeletronico.save();
    res.json({
      error: null,
      msg: "Cadastro ok",
      ProdutoeletronicoId: newProdutoeletronico._id,
    });
  } catch (error) {}
});

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
