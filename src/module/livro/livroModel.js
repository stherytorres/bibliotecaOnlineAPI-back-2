const mongoose = require('mongoose');

const livroModel = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: 'Campo obrigatório!',
            unique: true
        },
        titulo: {
            type: String,
            required: 'Campo obrigatório!'
        },
        paginas: {
            type: Number,
            required: 'Campo obrigatório!'
        },
        isbn: {
            type: Number,
            required: 'Campo obrigatório!'
        },
        editora: {
            type: String,
            required: 'Campo obrigatório!'
        }
    },
    {
        timestamps: true
    }
);

const livrosModel = mongoose.model('livros', livroModel);
module.exports = livrosModel;