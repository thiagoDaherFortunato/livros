const jwt = require('jsonwebtoken');
const authConfig = ('../config/auth');
module.exports = (req,res, next) =>{
    const autHeadres = req.headers.authorization;
    if(!autHeadres){
        return res.status(401).send({error : 'sem token autorizado'});
    }

    const parts = autHeadres.split(' ');
    if(!parts.lenght === 2 ){
        return res.status(401).send({error : 'erro no token'});
    }

    const [scheme, token] = parts;
   
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error : 'token mal formado'});
    }
    jwt.verify(token,'202cb962ac59075b964b07152d234b70',(err,decoded)=>{
        if(err){
            return res.status(401).send({error : 'token invalido'});
        }
        req.userId = decoded.id;
        return next();
    })
};