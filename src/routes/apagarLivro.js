const express = require("express");
const router = express.Router();
const livroModel = require("../module/livro/livromodel");

router.delete("/apagar/:id", async (req, res) => {
    try {
        const livro = await livroModel.findByIdAndDelete(req.params.id)
        if (!livro) {
            return res.status(404).send("Livro não encontrado")
        }
        res.status(200).send("Livro apagado")
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;