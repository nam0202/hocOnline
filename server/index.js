const RestCore = require('./template/rest-core');
const server = new RestCore('./server');
server.start('access.log');