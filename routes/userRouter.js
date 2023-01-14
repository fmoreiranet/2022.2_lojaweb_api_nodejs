const router = require('express').Router();
const User = require('../models/User');

router.post("/usuario/add", async function (req, res) {
    try {
        // Receber e montar o usuário
        const user = monteUser(req);
        // Validar os dados;
        validUser(user);
        // Verifica se usuário já existe
        await verifyUserExist(user.email);

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

router.patch("/usuario/:id", async function (req, res) {
    try {
        // Receber e montar o usuário
        let iduser = req.params.id;
        const user = monteUser(req);
        // Validar os dados;
        validUser(user, true);

        const updateUser = await User.updateOne({ _id: iduser }, user);

        if (updateUser.matchedCount > 0) {
            res.status(200).json({ message: "Atualizado!" });
            return;
        } else {
            throw new Error("Erro ao atualizar!");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/usuario/:id", async function (req, res) {
    try {
        let iduser = req.params.id;
        let user = await User.findOne({ _id: iduser });

        if (!user) {
            throw new Error("Erro ao remover o usuario!");
        }

        let deletUser = await User.deleteOne({ _id: iduser });
        if (deletUser.deletedCount > 0) {
            res.status(200).json({ message: "Removido!" });
            return;
        } else {
            throw new Error("Erro ao remover o usuario!");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



function monteUser(req) {
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

function validUser(user, update = false) {
    let error = 0;

    if (!update)
        if (!user.email) {
            error++;
            //res.status(422).json({ message: "E-mail obrigatório!" });
            //return
        }

    if (!user.nome) {
        error++;
        //res.status(422).json({ message: "Nome obrigatório!" });
        //return;
    }

    if (!user.senha) {
        error++;
        //res.status(422).json({ message: "Senha obrigatório!" });
        //return;
    }

    if (error > 0) {
        throw new Error('Error ao cadastrar ou usuário já cadastrado!');
    }
}

async function verifyUserExist(email) {
    let user = await User.find({ email: email });
    if (user.length != 0) {
        throw new Error('Error ao cadastrar ou usuário já cadastrado!');
    }
}

module.exports = router;