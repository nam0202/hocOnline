const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
class Notify {
    constructor() {
        this.db = connector.getConnect();
    }

    async getNotify(req, res) {
        let data = await this.db("notifycation").select("*");
        console.log("data",data);
        res.send(data);
    }

    async saveNotify(req,res){
        res.send("oke");
    }

}

module.exports = Notify;