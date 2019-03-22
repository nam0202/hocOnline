const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
class Notify {
    constructor() {
        this.db = connector.getConnect();
    }

    async getRolers(req, res) {
        console.log("req", req);
        let userId = req.query.id;
        console.log(userId);
        let data = await this.db("user_has_roles").select("*")
                        .innerJoin('roles','roles.id','user_has_roles.roles_id')
                        .where('user_has_roles.user_id',userId);
        console.log("data",data);
        
        res.send(data);
    }

    async saveNotify(req,res){
        res.send("oke");
    }

}

module.exports = Notify;