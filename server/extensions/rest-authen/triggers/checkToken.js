const jwt = require('jsonwebtoken');
const acl = require('express-acl');
acl.config({
    fileName:'nacl.json',
    baseUrl:'/api/'
});

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token){
        acl.authorize(req,res,(err)=>{
            if(err){

            }else{
                next(req,res);
            }
        })
    }else{
        jwt.verify(token.split(" ")[1], 'Bearer', (err, decoded) => {
            if (err) {
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
            }else {
                req.decoded = decoded;
                console.log(req.decoded);
                acl.authorize(req,res,function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('helloooo');
                        next(req,res);
                    }
                })
            }
        });
    }
}
module.exports = verifyToken;