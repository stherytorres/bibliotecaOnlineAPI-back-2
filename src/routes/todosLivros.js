const express = require("express");
const router = express.Router();
const livroModel = require("../module/livro/livromodel");

router.get("", async (req, res) => {
    try {
        const livros = await livroModel.find({});
        res.status(200).json({ livros })
    } catch {
        return res.status(500)
    }
});

module.exports = router;