const express = require('express');
class BaseRouter {
    constructor(path) {
        this.router = express.Router();
        this.rootPath = path;
        this.config();
    }

    config() {}

    getRootPath() {
        return this.rootPath;
    }
    getRouter() {
        return this.router;
    }
    addRouter(method, path, ctrl) {
        switch (method) {
            case 'GET': 
                this.addGetRouter(path, ctrl);
                break;
            case 'POST': 
                this.addPostRouter(path, ctrl);
                break;
            case 'PUT': 
                this.addPutRouter(path, ctrl);
                break;
            case 'DELETE': 
                this.addDeleteRouter(path, ctrl);
                break;
        }
    }
    addGetRouter(path, ctrl){
        this.router.get(path, ctrl);
    }
    addPostRouter(path, ctrl){
        this.router.post(path, ctrl);
    }
    addPutRouter(path, ctrl){
        this.router.put(path, ctrl);
    }
    addDeleteRouter(path, ctrl){
        this.router.delete(path, ctrl);
    }    
}

module.exports = BaseRouter;