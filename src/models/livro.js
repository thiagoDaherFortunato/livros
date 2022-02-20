const mongoose  = require('../database');

const LivroSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        require:true
    },
    tipo: {
        type: String,
        require:true,
        lowercase:true,
    },
    descricao: {
        type: String,
        require:true,
        lowercase:true,
    },
    alugado: {
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default:Date.now

    },

});


const Livro = mongoose.model('Livro', LivroSchema);


module.exports = Livro;