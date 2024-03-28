const express = require("express");
const router = express.Router();
const livroModel = require("../module/livro/livromodel");

router.put("/editar/:id", async (req, res) => {
    try {
        const livro = await livroModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!livro) {
            return res.status(404).send("Livro não encontrado")
        }
        res.status(200).send(livro)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;