const router = require('express').Router();
const User = require('../models/User');

router.post("/usuario/add", async function (req, res) {
    try {
        const {
            nome,
            foto,
            cpf,
            email,
            senha,
            telefone,
            data_nasc
        } = req.body;

        if (!nome) {
            res.status(422).json({ message: "Nome obrigatório!" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "E-mail obrigatório!" });
            return;
        } else {
            let users = await User.find({ email: email });
            if (users.length != 0) {
                res.status(422).json({ message: "Usuário já cadastrado!" });
                return;
            }
        }

        const user = {
            nome,
            foto,
            cpf,
            email,
            senha,
            telefone,
            data_nasc
        };

        await User.create(user);
        res.status(200).json({ message: "Cadastrado!" });

    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar!" });
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

module.exports = router;