const singleton = Symbol();
const singletonEnforcer = Symbol();
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const GLOBAL = "GLOBAL";
const METADATA = "METADATA";
class Config {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
        this.data = null
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Config(singletonEnforcer);
        }

        return this[singleton];
    }
    static get rootPath() {
        return path.resolve(__dirname).replace('node_modules/rest-config', '')
    }

    static get getPath() {
        let DIR = path.resolve(__dirname);
        let count = 10;
        while (count--) {
            if (path.resolve(DIR).indexOf('node_module') !== -1) {
                DIR = path.join(DIR, '../../');
                continue;
            }
            const pathGlobalJson = path.join(DIR, 'global.json');
            const pathMetaJson = path.join(DIR, 'meta.json');
            const pathGlobalYml = path.join(DIR, 'global.yml');
            const pathMetaYml = path.join(DIR, 'meta.yml');
            if (fs.existsSync(pathGlobalJson) && fs.existsSync(pathMetaJson)) {
                return path.resolve(DIR);
            } else if (fs.existsSync(pathGlobalYml) && fs.existsSync(pathMetaYml)) {
                return path.resolve(DIR);
            } else {
                DIR = path.join(DIR, '../');
            }
        }
        throw new Error('Cannot find file global or meta');
    }

    static getNameFileGlobal(path) {
        const pathConfig = fs.readdirSync(path).toString();
        if (pathConfig.indexOf('global.json') > -1) {
            return 'global.json';
        } else if (pathConfig.indexOf('global.yml') > -1) {
            return 'global.yml';
        }
        throw new Error(`Cant find file global in this path: ${path}`);
    }
    static getNameFileMeta(path) {
        const pathConfig = fs.readdirSync(path).toString();
        if (pathConfig.indexOf('meta.json') > -1) {
            return 'meta.json';
        } else if (pathConfig.indexOf('meta.yml') > -1) {
            return 'meta.yml';
        }
        throw new Error(`Cant find file meta in this path: ${path}`)
    }

    load(files) {
        if (this.data != null) return;
        this.loadConfig(files[0], GLOBAL);
        this.loadConfig(files[1], METADATA);
    }
    loadConfig(path, name) {
        try {
            if (this.data == null) this.data = {}
            const doc = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
            this.data[name] = doc;
        } catch (e) {
            throw e;
        }
    }
    loadGlobal(path) {
        this.loadConfig(path, GLOBAL);
    }
    loadMetadata(path) {
        this.loadConfig(path, METADATA);
    }

    get(name, key) {
        return this.data[name][key];
    }

    global(key) {
        return this.data[GLOBAL][key];
    }
    metadata(key) {
        return this.data[METADATA][key];
    }
}
module.exports = Config;