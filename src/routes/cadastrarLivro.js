const express = require("express");
const router = express.Router();
const livroModel = require("../module/livro/livromodel");

router.post("/cadastrar", async (req, res) => {
    const livro = new livroModel(req.body);
    const livroExistente = await livroModel.find({ id: req.body.id });

    if (livroExistente && livroExistente.length) {
        return res.status(400).json({ message: 'O livro já foi cadastrado' });
    }

    try {
        await livro.save();
        res.status(201).json(livro)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("ID existente!!")
        }
        res.status(500).send(error)
    }
});

module.exports = router;