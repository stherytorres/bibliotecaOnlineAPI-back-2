const mongoose = require('mongoose');
const { Schema } = mongoose;

const livroSchema = new Schema(
    {
        id: { type: String, required: true },
        titulo: String,
        paginas: Number,
        codigoISBN: Number,
        editora: String,
    },
    { 
        timestamps: true, 
    }
);

const LivroModel = mongoose.model('livros', livroSchema);

module.exports = LivroModel;