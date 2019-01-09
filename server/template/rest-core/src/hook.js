const DBConnector = require('../../rest-db');
const connector = DBConnector.instance;
const ExtensionManager = require('../../rest-extensions');

class Hook {
    constructor() {
        this.db = connector.getConnect();
        this.em = new ExtensionManager();
        this.init();
    }
    init() {
        const hooks = this.em.getHooks();
        hooks.forEach(element => {
            this.db.addHook(element.event, element.action, element.resource, 
                this.em.getHookInstance(element.dir, element.source)['hook']);
        });
    }
}
module.exports = Hook;