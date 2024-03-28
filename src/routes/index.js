const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        res.status(200).send('<a href="/livros">ver livros</a>')
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;