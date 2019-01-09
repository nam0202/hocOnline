const BaseRouter = require('./base');
const Controller = require('../controller');
const Utils = require('../utils');
// const TriggerManager = require('rest-triggers');
const ExtensionManager = require('../../../rest-extensions');

class ApiRouter extends BaseRouter {
    constructor() {
        super();
        this.em = new ExtensionManager();
    }

    list(req, res) {
        if (Utils.isAvaiable(req.params.resource, 'list')) {
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'list');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.getAll.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.getAll(req, res);
            }
        } else {
            res.send("404! Not found");
        }
    }

    create(req, res) {
        if (Utils.isAvaiable(req.params.resource, 'create')) {
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'create');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.add.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.add(req, res);
            }
        } else {
            res.send("404! Not found");
        }
    }
    page(req, res){
        const resource = req.params.resource;
        if(Utils.isAvaiable(req.params.resource,'page')){
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'page');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.getAllByPage.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.getAllByPage(req,res);
            }
        }else{
            res.send("404! Not found");
        }

    }
    show(req, res) {
        if (Utils.isAvaiable(req.params.resource, 'show')) {
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'show');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.get.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.get(req, res);
            }
        } else {
            res.send("404! Not found");
        }
    }

    edit(req, res) {
        if (Utils.isAvaiable(req.params.resource, 'edit')) {
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'edit');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.update.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.update(req, res);
            }
        } else {
            res.send("404! Not found");
        }
    }

    delete(req, res) {
        if (Utils.isAvaiable(req.params.resource, 'delete')) {
            const controller = new Controller(req.params.resource);
            const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'delete');
            if (triggerQueue.avaiable()) {
                triggerQueue.setProcess(controller.delete.bind(controller));
                triggerQueue.startBefore(req, res);
            } else {
                controller.delete(req, res);
            }
        } else {
            res.send("404! Not found");
        }
    }
    ref(req, res) {
        const resource = req.params.resource;
        const ref = req.params.ref;
        if (Utils.hasRefs(resource)) {
            const refData = Utils.getRef(resource, ref);
            req.refData = refData;
            if (refData != null && refData.length > 0) {
                const controller = new Controller(req.params.resource);
                const triggerQueue = this.em.getAvaiableTriggers(req.params.resource, 'ref');
                if(triggerQueue.avaiable()){
                    triggerQueue.setProcess(controller.getRef.bind(controller));
                    triggerQueue.startBefore(req,res);
                }else {
                    controller.getRef(req, res);
                }
            } else {
                res.send("404! Not found");
            }
        } else {
            res.send("404! Not found");
        }
    }

    config() {
        this.addRouter('GET','/:resource',this.page.bind(this));
        // this.addRouter('GET', '/:resource', this.list.bind(this));
        this.addRouter('GET', '/:resource/:id', this.show.bind(this));
        this.addRouter('GET', '/:resource/:id/:ref', this.ref.bind(this));
        this.addRouter('POST', '/:resource', this.create.bind(this));
        this.addRouter('PUT', '/:resource', this.edit.bind(this));
        this.addRouter('DELETE', '/:resource/:id', this.delete.bind(this));
    }
}

module.exports = ApiRouter;