const mongoose = require("mongoose");

const Address = mongoose.model("Address", {
    cep: String,
    logradouro: String,
    bairro: String,
    cidade: String,
    uf: String,
    numero: String,
    complemento: String,
    id_user: String,
});

module.exports = Address;