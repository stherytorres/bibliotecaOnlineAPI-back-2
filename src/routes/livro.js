const express = require("express");
const router = express.Router();
const livroModel = require("../module/livro/livromodel");

router.get("/:id", async (req, res) => {
    try {
        const livro = await livroModel.findById(req.params.id);
        if (!livro) {
            res.status(404).send("Livro não encontrado")
        }
        res.status(200).json(livro)
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;
