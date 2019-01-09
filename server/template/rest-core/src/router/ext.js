const BaseRouter = require('./base');
const ExtensionManager = require('../../../rest-extensions');
const Utils = require('../utils');
const PATH = require('path');
const Config = require('../../../rest-config');
const DIR = PATH.join(Config.getPath);
class ExtRouter extends BaseRouter {
    constructor(_rootPath) {
        super(_rootPath);
    }

    config() {
        const extensions = new ExtensionManager().getExtensions();
        extensions.forEach(item => {
            for (let i = 0; i < item.modules.length; i++) {
                item.modules[i]['dir'] = item.dir;
            }
        })
        const modules = Utils.flatten(extensions.map(item => item.modules));
        modules.forEach(item => {
            const dir = PATH.join( DIR, 'extensions');
            const Module = require(PATH.join(dir, item.dir, 'modules', item.source));
            const instance = new Module();
            const path = this.checkPath(item.path);
            this.addRouter(item.method, path, instance[item.function].bind(instance));
        });
    }

    checkPath(PATH) {
        let path = PATH;
        if (PATH.indexOf('?') > -1) {
            path = PATH.substr(0, PATH.indexOf('?'));
        }
        if (path.indexOf('{') > -1) {
            path = PATH.replace(/{/g, ':');
            path = path.replace(/}/g, '');
        }
        return path;
    }
}

module.exports = ExtRouter;