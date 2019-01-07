const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginModule {
    
    constructor() {
        this.db = connector.getConnect();
    }
    async register(req,res){
        let body = req.body;
        body.password = bcrypt.hashSync(body.password);
        try {
            const data = await this.db('login').insert(body);
            res.status(200).send({ message: 'success', user: data });
        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'register failed'});
        }
    }
    async login(req, res) {
        const body = req.body;
        try {
            const users = await this.db('login').select('*').join('user','user.id','login.user_id').where({
                username: body.username,
            });
            const user = users[0];
            if (!!user) {
                const isCorrectPassword = bcrypt.compareSync(body.password, user.password);
                if(!isCorrectPassword) {
                    return res.status(401).send('Wrong UserName or PassWord');
                }else {
                    const token = jwt.sign({
                            Id: user.id,
                            userName: user.username,
                            Role: user.role
                        }, 'Bearer', {expiresIn: 3600 * 24});
                    res.status(200).send({ Authorization: true, token: token });
                }
            } else {
                return res.status(401).send('Wrong UserName or PassWord');
            }
        } catch (e) {
            console.log(e.toString());
            res.status(500).send({error:{messege: "There was a problem for login"}});
        }
    }

}

module.exports = LoginModule;