const mongoose = require("mongoose");

const User = mongoose.model("User", {
    nome: String,
    foto: String,
    cpf: String,
    email: {
        type: String,
        unique: true,
    },
    senha: String,
    telefone: String,
    data_nasc: String,
    ative: Boolean
});

module.exports = User;