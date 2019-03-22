const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
class Notify {
    constructor() {
        this.db = connector.getConnect();
    }

    async getNotify(req, res) {
        let data = await this.db("notifycation").select("*");
        for(let i=0;i<data.length;i++){
            data[i].data = JSON.parse(data[i].data);
        }
        res.send(data);
    }

    async saveNotify(req,res){
        let data = req.body;
        for(let i=0;i<data.length;i++){
            data[i].data = JSON.stringify(data[i].data);
            this.db("notifycation").insert(data[i]).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
                
        }
        console.log(data);
        
        res.send("oke");
    }

}

module.exports = Notify;