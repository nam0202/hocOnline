const BaseRouter = require('./base');

class WebRouter extends BaseRouter{
    constructor() {
        super();
    }
    config() {
        this.addRouter('GET', '/', (req, res) => {
            res.send('ok');
        });
    }
}

module.exports = WebRouter;