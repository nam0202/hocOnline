const RestDb = require('../../../template/rest-db');
const connector = RestDb.instance;
const data = [
    {
        dayTitle: 'Thứ 5', dayDetail:new Date(2019,2,28),
        data: [
            {
                timeData: "07:00",
                content: "Ngày mai là hạn cuối nộp bài tập về nhà. Bạn nhớ hoàn thành bài tập và đẩy lên Github nhé!",
                isAlarm: true,
            },
        ]
    },
    {
        dayTitle: 'Thứ 6', dayDetail:new Date(2019,2,29), data: [
            {
                timeData: "07:00",
                content: "Nhớ lịch học lớp chúng ta là 15h chiều mai (thứ 7) nhé bạn",
                isAlarm: false
            },
            {
                timeData: "07:00",
                content: "Bạn nhớ hoàn thành bài tập đầy đủ trước khi đến lớp nhé!",
                isAlarm: false
            },
        ]
    },    
 ]
class Notify {
    constructor() {
        this.db = connector.getConnect();
    }

    async getNotify(req, res) {
        console.log(req.body.date);
        let data = await this.db("notifycation").select("*");
        for(let i=0;i<data.length;i++){
            data[i].data = JSON.parse(data[i].data);
        }
        console.log("data",data);
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