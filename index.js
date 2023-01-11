// Inicio do codigo
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Configurando Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rotas
app.get("/", function (req, res) {
    console.log("Request:", req);
    res.status(200).json({ message: "Bem vindo!" });
});

//Banco de Dados
const DB_USER = "adminMongo";
const DB_PASS = encodeURIComponent("PmzI87gjrt4bBjCj");
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-lojaweb.jcqtjqp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URI)
    .then(result => {
        console.log("Conectado!", result);
        app.listen(3000);
    })
    .catch(err => {
        console.error("Error: ");
    });
