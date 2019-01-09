const EXTENSIONS_PATH = 'extensions';
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const Config = require('../rest-config');
const DIR = path.join(Config.getPath,EXTENSIONS_PATH);
class Trigger {
    constructor(action, next) {
        this.action = action;
        this.next = next;
        this.run = this.run.bind(this);
    }

    run(req, res) {
        this.action(req, res, this.next);
    }
}

class TriggerQueue {
    constructor() {
        this.queueBefore = [];
        this.queueAfter = [];
    }
    avaiable() {
        if (this.queueBefore.length > 0 || this.queueAfter.length > 0) return true;
        return false;
    }
    info() {
        console.log('before ', this.queueBefore);
        console.log('after ', this.queueAfter);
    }
    startBefore(req, res) {
        this.queueBefore[0].run(req, res);
    }
    setProcess(action) {

        let trigger = new Trigger(action, null);

        const afterFirst = this.queueAfter.length > 0 ? this.queueAfter[0] : null;
        trigger.next = afterFirst != null ? afterFirst.run : null;

        let lastBefore = this.queueBefore[this.queueBefore.length - 1];
        lastBefore.next = trigger.run;
    }
    startAfter(req, res) {
        this.queueAfter[0].run(req, res);
    }
    addBefore(action) {
        let prev = this.queueBefore.length > 0 ? this.queueBefore[this.queueBefore.length - 1] : null;
        let trigger = new Trigger(action, null);
        if (prev)
            prev.next = trigger.run;
        this.queueBefore.push(trigger);
    }
    addAfter(action) {
        console.log('addAfter', action);
        let prev = this.queueAfter.length > 0 ? this.queueAfter[this.queueAfter.length - 1] : null;
        let trigger = new Trigger(action, null);
        if (prev)
            prev.next = trigger.run;
        this.queueAfter.push(trigger);
    }
}

class ExtensionManager {

    constructor() {
        this.extensions = [];
    }

    getConfig(name) {
        const pathConfigJson = path.join(DIR,name,'config.json');
        const pathConfigYml = path.join(DIR,name,'config.yml');
        if (fs.existsSync(pathConfigJson)) {
            return require(pathConfigJson);
        } else if (fs.existsSync(pathConfigYml)) {
            return yaml.safeLoad(fs.readFileSync(pathConfigYml, 'utf8'));
        }
        throw new Error('Cannot find file config');
    }

    getExtensions() {
        if(this.extensions.length<=0){
            const dirs = fs.readdirSync(DIR);
            this.extensions = [];
            dirs.forEach(item => {
                try {
                    fs.readdirSync(path.join(DIR,item));
                    let obj = {}
                    obj = this.getConfig(item);
                    obj.dir = "/"+item;
                    if(obj.triggers)
                        obj.triggers.forEach(item =>
                            (item.priority && item.priority > 0 && item.priority < 6)
                                ? item : (item.priority = 5))
                    this.extensions.push(obj);
                }catch (e) {
                }
            });
        }
        return this.extensions;
    }

    getTriggers() {
        const ext = this.getExtensions();
        const flatten = list => list.reduce( (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [] );
        ext.forEach(item => {
            if (item.triggers)
                for (let i = 0; i < item.triggers.length; i++) {
                    item.triggers[i]['dir'] = item.dir;
                }
        })

        return this.clean(flatten(ext.map(item => item.triggers)));
    }

    clean(list) {
        return list.filter( item => item !== undefined);
    }

    getAvaiableTriggers(resource, method) {
        const triggers = this.getTriggers();
        const triggersInfo = triggers.filter( item => {
            if (item.resource.indexOf(resource) > -1) {
                if (item.method && item.method.indexOf(method) > -1 || item.method == 'all')
                    return item;
            }
        })
        triggersInfo.sort((a,b) => a.priority - b.priority);
        const triggerQueue = new TriggerQueue();
        triggersInfo.forEach( item => {
            const Trigger = require(DIR + item.dir + '/triggers/' + item.source);
            const instance = new Trigger();
            if (instance.before) triggerQueue.addBefore(instance.before);
            if (instance.after) triggerQueue.addAfter(instance.after);
        })
        return triggerQueue;
    }

    getAvaiableTriggersModule(module) {
        const triggers = this.getTriggers();
        const triggersInfo = triggers.filter( item => item.modules && item.modules.indexOf(module) > -1);
        triggersInfo.sort((a,b) => a.priority - b.priority);
        const triggerQueue = new TriggerQueue();
        triggersInfo.forEach( item => {
            const Trigger = require(DIR + item.dir + '/triggers/' + item.source);
            const instance = new Trigger();
            if (instance.before) triggerQueue.addBefore(instance.before);
            if (instance.after) triggerQueue.addAfter(instance.after);
        })
        return triggerQueue;
    }

    getHooks() {
        const ext = this.getExtensions();
        const flatten = list => list.reduce( (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [] );
        ext.forEach(item => {
            if (item.hooks)
                for (let i = 0; i < item.hooks.length; i++) {
                    item.hooks[i]['dir'] = item.dir;
                }
        })
        return this.clean(flatten(ext.map(item => {if (item.hooks) return item.hooks})));
        // console.log('info ', hooksInfo);
        // let arr = [];
        // hooksInfo.forEach( item => {
        //     const Hook = require(DIR + item.dir + '/hooks/' + item.source);
        //     const instance = new Hook();
        //     arr.push(instance);
        // })
        // return arr;
    }
    getHookInstance(dir, source) {
        const Hook = require(DIR + dir + '/hooks/' + source);
        return new Hook();
    }
}
module.exports = ExtensionManager;
