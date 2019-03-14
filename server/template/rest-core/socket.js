

class SocketIO {
    constructor(http){
        this.io = require('socket.io')(http);
        this.init();
    }
    init(){
        console.log("init", );
        this.io.on('connection',(socket)=>{
            console.log('a user');
        })
    }
}

module.exports = SocketIO;