const Model = require('../model');

class Controller {
    constructor(resource) {
        this.model = new Model(resource);        
    }

    async getAll(req, res, next) {
        try {
            const data = await this.model.getAll();
            if (next) {
                res.data = data;
                next(req, res);
            } else {
                (typeof data !== "undefined") ?
                    res.json({ message: 'success', data: data}) :
                    res.json({ message: 'success', data: []});
            }
        }catch (e) {
           console.log(e.message);
           res.status(500).json({message:'get failed'});
        }

    }
    async getRef(req, res, next) {
        try{
            let options = [];
            if (!!req.query.ref && !!req.query.map) {
                let refs = JSON.parse(req.query.ref);
                let value = JSON.parse(req.query.map);
                options = this.mapArray(refs,value);
            }
            const data = await this.model.getRef(req.refData[0],req.params.id,req.query.page,req.query.limit,options);
            const count = await this.model.countRef(req.refData[0],req.params.id);
            if (next) {
                res.data = data;
                next(req, res);
            } else {
                (typeof data !== "undefined") ?
                    res.json({ message: 'success', data: data,count:count}) :
                    res.json({ message: 'success', data: []});
            }
        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'get failed'});
        }
    }
    async get(req, res, next) {
        try {
            const data = await this.model.get(req.params.id);
            (typeof data !== "undefined") ?
                res.json({ message: 'success', data: data}) :
                res.json({ message: 'success', data: []});

        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'get failed'});
        }
    }
    mapArray(arr1,arr2){
        return arr1.map((item,i)=>{
            return { 'ref': item, 'value': arr2[i] };

        })
    }
    async getAllByPage(req, res, next) {
        try {
            let options = [];
            if (!!req.query.ref && !!req.query.map) {
                let refs = JSON.parse(req.query.ref);
                let value = JSON.parse(req.query.map);
                options = this.mapArray(refs,value);
            }
            delete req.query.ref;
            delete req.query.map;
            let reqQuery = req.query;
            const limit = reqQuery.limit;
            const page = reqQuery.page;
            delete reqQuery.limit;
            delete reqQuery.page;
            delete reqQuery.password;
            for (let field in reqQuery) {
                if (reqQuery[field] === 'undefined') {
                    delete reqQuery[field];
                }
            }
            const data = await this.model.getPage(page, limit, reqQuery, options);
            const count = await this.model.count();
            (typeof data !== "undefined") ?
                res.json({ message: 'success', data: data, count: count }) :
                res.json({ message: 'success', data: [] });
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: 'get failed' });
        }
    }
    async add(req, res, next) {
        try {
            const data =  await this.model.add(req.body);
            (typeof data !== "undefined") ?
                res.json({ message: 'success', data: data}) :
                res.json({ message: 'success', data: []});
        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'add failed'});
        }
    }
    async update(req, res, next) {
        try {
            const data = await this.model.update(req.body);
            (typeof data !== "undefined") ?
                res.json({ message: 'success', data: data}) :
                res.json({ message: 'success', data: []});
        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'update failed' });
        }
    }
    async delete(req, res, next) {
        try{
            const data = await this.model.del(req.params.id);
            (typeof data !== "undefined") ?
                res.json({ message: 'success', data: data}) :
                res.json({ message: 'success', data: []});
        }catch (e) {
            console.log(e.message);
            res.status(500).json({message:'delete failed'});
        }
    }

}
module.exports = Controller;