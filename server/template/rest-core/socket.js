

class SocketIO {
    constructor(http){
        this.io = require('socket.io')(http);
        this.init();
    }
    init(){
        this.io.on('connect',(socket)=>{
            console.log('a user');
        })
    }
}

module.exports = SocketIO;