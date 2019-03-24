const express = require('express');
const config = require('../rest-config').instance;
const bodyParser = require('body-parser');
const GLOBAL_PATH = './global.yml';
const METADATA_PATH = './meta.yml';
const WebRouter = require('./src/router/web');
const ApiRouter = require('./src/router/api');
const ExtRouter = require('./src/router/ext');
const SwaggerClient = require('../rest-swagger');
const Hook = require('./src/hook');
const fs = require('fs');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const limit = config.global('server')['limit'] || 10;
const path = require('path');
const cors = require('cors');
const SocketIO = require('./socket');
class Server {

    constructor(_rootPath) {
        config.load([GLOBAL_PATH, METADATA_PATH]);
        this.app = express();
        this.http = require('http').Server(this.app);
        this.rootPath = _rootPath;
        new Hook();
        console.log(_rootPath);
    }
    setupMiddleware(dirLog) {
        this.app.use(cors(config.data.GLOBAL.cors))
        this.app.use(fileUpload({
            limits: limit * 1024 * 1024
        }));
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json({
            limit: `${limit}Mb`
        }));
        console.log(path.join(this.rootPath, config.global('server')['static']));
        this.app.use(express.static(path.join(this.rootPath, config.global('server')['static'])));
        this.app.use(morgan('combined', {
            stream: fs.createWriteStream(dirLog ? dirLog : './access.log', {
                flags: 'a'
            })
        }));
    }

    setupRouter() {
        this.app.use('/', new WebRouter().getRouter());
        this.app.use('/doc', SwaggerClient.serve, SwaggerClient.setup());
        this.app.use('/api/ext', new ExtRouter(this.rootPath).getRouter());
        this.app.use('/api', new ApiRouter().getRouter());
    }
    listen() {
        // this.app.listen(config.global('server')['port'], () => {
        //     console.log('Server is running at ... ' + config.global('server')['port']);
        // });
        new SocketIO(this.http);
        this.http.listen(config.global('server')['port'], () => {
            console.log('Server is running at ... ' + config.global('server')['port']);
        });
    }
    start(dirLog) {
        this.setupMiddleware(dirLog);
        this.setupRouter();
        this.listen();
    }
}
module.exports = Server;