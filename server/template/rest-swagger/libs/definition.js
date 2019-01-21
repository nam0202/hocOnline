class Definition {
    constructor() {
        this.data = {
            'type': '',
            'properties': {},
            'xml': {}
        };
    }
    setType(val) {
        this.data.type = val;
        return this;
    }
    addProperty(name, val) {
        this.data.properties[name] = val;
        return this;
    }
    setXml(val) {
        this.data.xml = val;
        return this;
    }
    getJson() {
        return this.data;
    }
}
module.exports = Definition;