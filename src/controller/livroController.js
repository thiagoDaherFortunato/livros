const express = require('express');
const Livro = require('../models/livro');
const validarToken =  require('../middleware/auth');

const router = express.Router();

router.use(validarToken);
router.post('/CadastroLivro', async (req,res)=>{
    const {name} = req.body
    try{
        if(await Livro.findOne({name})){
            return res.status(400).send({
                error: 'Livro Cadastrado'
            }); 
        }
        const livro =  await Livro.create(req.body);
        return res.send({livro});
    }
    catch(err){
        return res.status(400).send({
            error: 'Erro ao cadastrar livro'
        });
    } 
});


module.exports = app => app.use('/livros',router);