const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = ('../config/auth');

const router = express.Router();

function generateToken(params ={}){
    return jwt.sign(params, '202cb962ac59075b964b07152d234b70',{
        expiresIn : 86400
    })
}

router.post('/register', async (req,res)=>{
    const {email} = req.body
    try{
        if(await User.findOne({email})){
            return res.status(400).send({
                error: 'Usuário cadastrado'
            }); 
        }
        const user =  await User.create(req.body);
        user.password = undefined;
        const token =  generateToken({id: user.id})
        return res.send({ user, token});
    }catch{err}{
        return res.status(400).send({
            error: 'Falaha ao registrar usuário'
        });
    }
    

});

router.post('/login', async (req,res)=>{
    const {email , password} = req.body
    const user= await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).send({
            error: 'Usuário não encontrado'
        });
    }
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            error: 'Senha incorreta'
        });
    }
    user.password = undefined;
    const token =  generateToken({id: user.id})
    res.send({user , token});
});

module.exports = app => app.use('/auth',router);