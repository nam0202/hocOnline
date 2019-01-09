const FullApi = require('./fullapi');
class SwaggerJson {

    constructor() {
        this.data = {
            "swagger": "2.0",
            "info": {},
            "host": "",
            "basePath": "",
            "tags": [],
            "schemes": ["http"],
            "paths": {},
            "definitions": {}
        }
    }
    addDesc(str) {
        this.data.info.description = str;
        return this;
    }
    addVersion(v) {
        this.data.info.version = v;
        return this;
    }
    addTitle(title) {
        this.data.info.title = title;
        return this;
    }
    addContact(contact) {
        this.data.info.contact = contact;
        return this;
    }
    addHost(host){
        this.data.host = host;
        return this;
    }
    addBasePath(path) {
        this.data.basePath = path;
        return this;
    }
    addTag(tag) {
        this.data.tags.push(tag);
        return this;
    }
    addSchema(schema) {
        this.data.schemes.push(schema);
        return this;
    }
    addApi(resource, apis, properties, refs) {
        const api = new FullApi(resource, apis, properties, refs);
        const data = api.getData();
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            this.addPath(element.key, element.value);
        }
    }
    addPath(key, value) {
        if (!this.data.paths[key])
            this.data.paths[key] = value;
        else 
            this.data.paths[key] = value;
        return this;
    }
    addDefinition(key, value) {
        this.data.definitions[key] = value;
        return this;
    }
    getJson() {
        return this.data;
    }   
}

module.exports = SwaggerJson;