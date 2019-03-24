

class SocketIO {
    constructor(http){
        this.io = require('socket.io')(http,{origins:'*:*'});
        this.socketAdmin = null;
        this.init();
        
    }
    init(){
        this.io.on('connection',(socket)=>{
            console.log("Co nguoi ket noi " + socket.id);
            socket.on("tao-room",(data)=>{
                console.log("tao room", data);
                socket.join(data);
                socket.room = data;

                var mang = [];
                console.log("socket", socket.adapter);
                for (const r in socket.adapter.rooms) {
                    mang.push(r);
                }
                this.io.sockets.emit("server-send-rooms", mang);
                socket.emit("server-send-room-socket", data);
            })
            // socket.on('role-client',(role)=>{
            //     if(role === 'admin'){
            //         this.socketAdmin = socket;
            //     }
            // })
            socket.on("user-chat", (data) => {
                this.io.in(socket.room).emit("server-chat", {
                    data: data,
                    socketId: this.socketId
                });
            })
            socket.on("admin-send-user",(data)=>{
                this.io.in(data.id).emit("server-send-client",{data});
            })
        })
    }
}

module.exports = SocketIO;