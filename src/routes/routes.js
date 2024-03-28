function routes(app) {
    app.use("/", require("./index.js"));
    app.use("/livros", require("./todosLivros.js"));
    app.use("/livros", require("./livro.js"));
    app.use("/livros", require("./cadastrarLivro.js"));
    app.use("/livros", require("./editarLivro.js"));
    app.use("/livros", require("./apagarLivro.js"));
};

module.exports = routes;