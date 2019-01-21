const DBConnector = require('rest-db');
const connector = DBConnector.instance;
const check = require('./checkToken');

class TriggerCheckToken {

    before(req, res, next) {
        check(req,res,next);
    }


}

module.exports = TriggerCheckToken