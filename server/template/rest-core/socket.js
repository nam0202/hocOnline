

class SocketIO {
    constructor(http){
        this.io = require('socket.io')(http,{origins:'*:*'});
        this.socketAdmin = null;
        this.init();

    }
    init(){
        this.io.on('connection',(socket)=>{
            socket.on("tao-room",(data)=>{
                socket.join(data);
                socket.room = data;
            })
            socket.on('role-client',(role)=>{
                if(role === 'admin'){
                    this.socketAdmin = socket;
                }
            })
            socket.on("user-send-admin",(data)=>{
                this.io.in(this.socketAdmin.id).emit("server-send-admin",{data:data,socketId:this.socketId});
            })
            socket.on("admin-send-user",(data)=>{
                this.io.in(data.id).emit("server-send-client",{data});
            })
        })
    }
}

module.exports = SocketIO;