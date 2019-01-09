const MyPath = require('./path');
class FullApi {
    constructor(resource, api, properties, refs) {
        this.resource = resource;
        this.api = api;
        this.properties = properties;
        this.refs = refs;
        this.data = [];
    }
    combineObject(objA, objB) {
        if (objA == null || objA == {}) return objB;
        if (objB == null || objB == {}) return objA;

        const keys = Object.keys(objB);
        let newObj = objA;
        newObj[keys[0]] = objB[keys[0]];
        return newObj;
    }
    getData() {
        this.genApiDoc();
        return this.data;
    }
    genApiDoc() {
        let page = this.genGetPagePath();
        this.data.push({'key':`/${this.resource}?${this.getPathFilter()}`,'value':page});
        let base = this.combineObject(this.genAddPath());
        base = this.combineObject(base, this.genUpdatePath());
        this.data.push({ 'key': `/${this.resource}`, 'value': base })

        let edit = this.combineObject(this.genGetIdPath(), this.genDeletePath());
        this.data.push({ 'key': `/${this.resource}/{id}`, 'value': edit });
        if(this.refs){
            this.refs.forEach(item => {
                const relation = item.one? 'one':'many';
                const ref = item.one ? item.one : item.many;
                const path = item.one? `/${this.resource}/{id}/${ref}`: `/${this.resource}/{id}/${ref}?${this.getPathFilter('ref')}`;
                this.data.push({ 'key': path, 'value': this.getRefApi(ref,relation) });
            })
        }
    }
    getPathFilter(api){
        let path = 'page={page}&limit={limit}';
        if(api==='ref'){
            return path;
        }
        for (let i = 0; i < this.properties.length; i++) {
            if(this.properties[i].name === 'id') continue;
            path+=`&${this.properties[i].name}={${this.properties[i].name}}`;
        }
        return path
    }
    getPropertiesPage(api){
        let values = [];
        const limit = {
            name: 'limit',
            in: 'path',
            description: `number row`,
            required: true,
            type: 'integer'
        };
        const page = {
            name: 'page',
            in: 'path',
            description: `number of page`,
            required: true,
            type: 'integer'
        }
        values.push(page, limit);
        if(api==='ref')
            return values;
        for (let i = 0; i < this.properties.length; i++) {
            if(this.properties[i].name === 'id') continue;
            const data = {
                name: this.properties[i].name,
                in: 'path',
                description: `filter by ${this.properties[i].name}`,
                required: false,
                type: this.properties[i].type
            }
            values.push(data);
        }
        return values;
    }
    getRefApi(ref , relation) {
        if (this.refs.length > 0) {
            const id = {
                name: 'id',
                in: 'path',
                description: `Id của ${this.resource}`,
                required: true,
                type: 'integer'
            };
            let path = new MyPath('get')
                .addTag(this.resource)
                .addSummary('Lấy dữ liệu ' + ref + ' theo ' +this.resource+ ' id.')
                .addOperation('get' + ref + 'by'+this.resource+'Id')
                .addConsume('application/json')
                .addProduce('application/json')
                .addParams(id)
                .addResponse('200', { 'description': 'ok' });
            if(relation === 'many'){
                path.addParams(this.getPropertiesPage('ref'));
            }
            return path.getJson();
        } else {
            return null;
        }
    }
    genGetPagePath(){
        if(this.api == 'all' || this.api.indexOf('page')>=0){
            const path = new MyPath('get')
                .addTag(this.resource)
                .addSummary('Lây dứ liệu ' + this.resource+ ' theo page')
                .addOperation('get' + this.resource + 'byPage')
                .addConsume('application/json')
                .addProduce('application/json')
                .addParams(this.getPropertiesPage())
                .addResponse('200', { 'description': 'ok' });
            return path.getJson();
        }else {
            return null;
        }
    }
    genGetAllPath() {
        if (this.api == 'all' || this.api.indexOf('list') >= 0) {
            const path = new MyPath('get')
                .addTag(this.resource)
                .addSummary('Lây dứ liệu ' + this.resource)
                .addOperation('get' + this.resource)
                .addConsume('application/json')
                .addProduce('application/json')
                .addResponse('200', { 'description': 'ok' });
            return path.getJson();
        } else {
            return null
        }

    }
    genGetIdPath() {
        if (this.api == 'all' || this.api.indexOf('show') >= 0) {
            const id = {
                name: 'id',
                in: 'path',
                description: `Id của ${this.resource}`,
                required: true,
                type: 'integer'
            }
            const path = new MyPath('get')
                .addTag(this.resource)
                .addSummary('Lấy dữ liệu ' + this.resource + ' theo id.')
                .addOperation('get' + this.resource + 'byId')
                .addConsume('application/json')
                .addProduce('application/json')
                .addParams(id)
                .addResponse('200', { 'description': 'ok' });
            return path.getJson();
        } else {
            return null
        }
    }
    genAddPath() {
        const props = this.properties.map(item => {
            return {
                name: item.name,
                in: 'formData',
                type: item.type,
                description: item.description || 'đang cập nhật...',
                require: item.require || false
            }
        })

        if (this.api == 'all' || this.api.indexOf('create') >= 0) {
            const path = new MyPath('post')
                .addTag(this.resource)
                .addSummary('Thêm dữ liệu ' + this.resource + ' mới vào CSDL.')
                .addOperation('add' + this.resource)
                .addConsume('application/x-www-form-urlencoded')
                .addProduce('application/json')
                .addResponse('200', { 'description': 'ok' });

            props.forEach(element => {
                path.addParams(element)
            });
            return path.getJson();
        } else {
            return null;
        }
    }
    genUpdatePath() {
        const props = this.properties.map(item => {
            return {
                name: item.name,
                in: 'formData',
                type: item.type,
                description: item.description || 'đang cập nhật...',
                require: item.require || false
            }
        })
        if (this.api == 'all' || this.api.indexOf('edit') >= 0) {
            const path = new MyPath('put')
                .addTag(this.resource)
                .addSummary('Cập nhật dữ liệu ' + this.resource + ' mới vào CSDL.')
                .addOperation('edit' + this.resource)
                .addConsume('application/x-www-form-urlencoded')
                .addProduce('application/json')

                .addResponse('200', { 'description': 'ok' });

            props.forEach(element => {
                path.addParams(element)
            });
            return path.getJson();
        } else {
            return null;
        }
    }
    genDeletePath() {
        if (this.api == 'all' || this.api.indexOf('delete') >= 0) {
            const id = {
                name: 'id',
                in: 'path',
                description: `Id của ${this.resource}`,
                required: true,
                format: 'int64',
                type: 'integer'
            }
            const path = new MyPath('delete')
                .addTag(this.resource)
                .addSummary('Xóa ' + this.resource + ' khỏi CSDL theo Id.')
                .addOperation('delete' + this.resource)
                .addConsume('application/json')
                .addProduce('application/json')
                .addParams(id)
                .addResponse('200', { 'description': 'ok' });
            return path.getJson();
        } else {
            return null;
        }
    }
}
module.exports = FullApi;