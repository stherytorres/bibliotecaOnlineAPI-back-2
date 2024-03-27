const express = require('express');
const livroModel = require('./src/module/livro/livro.model');
const { connectToMongo } = require("./src/config/mongo");

const app = express();
app.use(express.json());

connectToMongo();

app.get('/livros', async (req, res) => { // Listar livros
    const livros = await livroModel.find({});
    return res.status(200).json(livros);
});

app.post('/livros/cadastro', async (req, res) => { // Cadastrar livros
    if (!req.body.id) {
        return res.status(400).json({ message: 'O campo id é obrigatório' });
    }
    if (!req.body.titulo) {
        return res.status(400).json({ message: 'O campo título é obrigatório' });
    }
    if (!req.body.paginas) {
        return res.status(400).json({ message: 'O campo páginas é obrigatório' });
    }
    if (!req.body.codigoISBN) {
        return res.status(400).json({ message: 'O campo código ISBN é obrigatório' });
    }
    if (!req.body.editora) {
        return res.status(400).json({ message: 'O campo editora é obrigatório' });
    }

    //Verifica se o livro ja existe na base
    const livroExistente = await livroModel.find({ codigoISBN: req.body.codigoISBN });

    if (livroExistente && livroExistente.length) {
        return res.status(400).json({ message: 'O livro já foi cadastrado' });
    }

    const livro = await livroModel.create({
        id: req.body.id,
        titulo: req.body.titulo,
        paginas: req.body.paginas,
        codigoISBN: req.body.codigoISBN,
        editora: req.body.editora,
    });

    return res.status(201).json(livro);
});

app.put('/livros/edicao/:livroId', async (req, res) => { // Editar livros
    try {
        const livroId = req.params.livroId;

        const livroExistente = await livroModel.findById(livroId);
        if (!livroExistente) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        delete req.body._id;
        await livroModel.findByIdAndUpdate(livroId, { $set: req.body }); // testar só com o req.body thks

        const livroAtualizado = await livroModel.findById(livroId);

        return res.status(200).json(livroAtualizado);
    } catch (error) {
        console.error('Erro ao editar o livro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.delete('/livros/:livroId', async (req, res) => { // Deletar livros
    const livroId = req.params.livroId;

    try {
        const livroExistente = await livroModel.findById(livroId);
        if (!livroExistente) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        await livroModel.findByIdAndDelete(livroId);
        return res.status(200).json({ message: 'Livro excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


app.listen(9090, () => {
    console.log('Servidor funcionando na porta 9090');
});