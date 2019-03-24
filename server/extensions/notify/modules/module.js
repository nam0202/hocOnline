const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
class Notify {
    constructor() {
        this.db = connector.getConnect();
    }

    async getNotify(req, res) {
        let date = req.query.day;
        date = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        let startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
        let day = 7 - startDate.getDay();
        let endDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+day);
        let data = await this.db("notifycation")
                                .select("*")
                                .where('dayDetail','>=',startDate)
                                .where('dayDetail','<=',endDate);
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