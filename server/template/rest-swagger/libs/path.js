class MyPath {
    constructor(method) {
        this.method = method;
        this.data = {};
        this.data[method] = {
            'tags': [],
            'summary': '',
            'description': '',
            'operationId': '',
            'consumes': [],
            'produces': [],
            'parameters': [],
            'responses': {},
            'security': []
        };
    }

    addTag(value) {
        this.data[this.method].tags.push(value);
        return this;
    }
    addSummary(value) {
        this.data[this.method].summary = value;
        return this;
    }
    addDesc(value) {
        this.data[this.method].description = value;
        return this;
    }
    addOperation(value) {
        this.data[this.method].operationId = value;
        return this;
    }
    addConsume(value) {
        this.data[this.method].consumes.push(value);
        return this;
    }
    addProduce(value) {
        this.data[this.method].produces.push(value);
        return this;
    }
    addResponse(key, value) {
        this.data[this.method].responses[key] = value;
        return this;
    }
    addParams(values) {
        if(!!values.length){
            for (let i = 0; i < values.length ; i++) {
                this.data[this.method].parameters.push(values[i]);
            }
        }else{
            this.data[this.method].parameters.push(values);
        }
        return this;
    }
    addSecurity(value) {
        this.data[this.method].security.push(value);
        return this;
    }
    getJson() {
        return this.data;
    }
}
module.exports = MyPath;