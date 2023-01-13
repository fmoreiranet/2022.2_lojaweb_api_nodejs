const router = require('express').Router();
const User = require('../models/User');

router.post("/usuario/add", async function (req, res) {
    try {
        //Receber e montar o usuário
        const user = montUser(req);
        //Validar os dados;
        await validUser(User, user);
        await User.create(user);
        res.status(200).json({ message: "Cadastrado!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/usuario/list", async function (req, res) {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar!" });
    }

});

router.get("/usuario/:id", async function (req, res) {
    try {
        let iduser = req.params.id;
        let user = await User.findOne({ _id: iduser });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar!" });
    }
});

function montUser(req) {
    const {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc
    } = req.body;

    const user = {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc
    };

    return user;
}

async function validUser(User, dataUser) {
    let error = 0;
    if (!dataUser.email) {
        error++;
        //res.status(422).json({ message: "E-mail obrigatório!" });
        //return
    } else {
        let users = await User.find({ email: dataUser.email });
        if (users.length != 0) {
            error++;
            //res.status(422).json({ message: "Usuário já cadastrado!" });
            //return;
            //throw new Error("Usuário já cadastrado!");
        }
    }

    if (!dataUser.nome) {
        error++;
        //res.status(422).json({ message: "Nome obrigatório!" });
        //return;
    }

    if (!dataUser.senha) {
        error++;
        //res.status(422).json({ message: "Senha obrigatório!" });
        //return;
    }

    if (error > 0) {
        throw new Error('Error ao cadastrar ou usuário já cadastrado!');
    }
}

module.exports = router;