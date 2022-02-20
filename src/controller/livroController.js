const express = require('express');
const Livro = require('../models/livro');
const validarToken =  require('../middleware/auth');
const db  = require('../database');
var objsctID = require('mongoose').ObjsctID;
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


router.get('/ListaLivros', async (req,res)=>{
    const livro =  await Livro.find();
    try{
       
        return res.status(200).send({
            livro
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao listar os livros'
        });
    } 
});


router.get('/EncontrarLivro/:name', async (req,res)=>{
    const livro =  await Livro.find({'name':req.params.name});
    try{
       
        return res.status(200).send({
            livro
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            error: 'Erro a econtrar o livro'
        });
    } 
});

router.put('/AlugarLivro/:name', async (req,res)=>{
    const livro =  await Livro.find({'name':req.params.name});
   
    console.log(livro.alugado)
    try{
        if(livro.alugado){
            return res.status(400).send({
                error: 'Livro alugado'
            });
        }
        var livroUpdate= {
            alugado:true
        }
       livro.alugado = false;
       await Livro.findOneAndUpdate({'name':req.params.name},livro);
        console.log(livro)
        return res.status(200).send({
            livro
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao alugar o livro'
        });
    } 
});



router.put('/AtualizarLivro/:name', async (req,res)=>{
    const livro =  await Livro.find({'name':req.params.name});
   
    console.log(livro.alugado)
    try{
        if(livro.alugado){
            return res.status(400).send({
                error: 'Livro alugado'
            });
        }
        var livroUpdate= {
            alugado:true
        }
       livro.alugado = false;
       await Livro.findOneAndUpdate({'name':req.params.name},livro);
        console.log(livro)
        return res.status(200).send({
            livro
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao alugar o livro'
        });
    } 
});
module.exports = app => app.use('/livros',router);