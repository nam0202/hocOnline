const RestCore = require('./template/rest-core');
const server = new RestCore(__dirname);
server.start('access.log');