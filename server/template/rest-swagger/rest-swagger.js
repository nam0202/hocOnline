const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {SwaggerJson, Definition} = require('./libs');
const path = require('path');
const options = {
    // customCss: '.swagger-ui .topbar { display: none }'
};
const Config = require('../rest-config');
const PATH = Config.getPath;
const config = Config.instance;
const ExtensionManager = require('../rest-extensions');
const MyPath = require('./libs/path');

class SwaggerClient {

    static get serve() {
        return swaggerUi.serve
    }

    static setup() {
        const exts = new ExtensionManager().getExtensions();
        const modules = exts.map(item => item.modules);
        const flatten = (list) => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        const extsApi = flatten(modules);


        const definitions = this.loadMeta().definitions;
        const resources = definitions.map(item => Object.keys(item)[0])
        const instance = new SwaggerJson();
        instance.addDesc("Đây là server API DEMO.")
            .addVersion("1.0.0")
            .addTitle("Sample API")
            .addContact({'email': 'hoangnm@ows.vn', 'phone': '0918264721'})
            .addHost('localhost' +':'+ config.global('server')['port'])
            .addBasePath('/api');
        // add tag
        resources.forEach(item => instance.addTag({'name': item, 'description': `Truy xuất bảng ${item}`}));
        instance.addTag({'name': 'extension', 'description': `Tổng hợp các api mở rộng`})

        // add paths
        let valueBefore;
        let keyBefore;
        extsApi.sort((a,b)=> a.path > b.path);
        extsApi.forEach(item => {
            let path = new MyPath(item.method.toLowerCase())
                .addTag('extension')
                .addSummary(item.summary)
                .addOperation(item.name)
                .addConsume('application/x-www-form-urlencoded')
                .addProduce('application/json')
                .addResponse('200', {'description': 'ok'});
            //add body
            let propertiesPaths = [],
                rxp = /{([^}]+)}/g,
                str = item.path,
                curMatch;
            while( curMatch = rxp.exec( str ) ) {
                propertiesPaths.push( curMatch[1] );
            }
            if (item.properties) {
                path = this.setupProperties(item.properties,path,propertiesPaths);
            }
            if(!valueBefore){
                valueBefore = path.getJson();
                keyBefore = item.path;
            }else if(keyBefore === item.path){
                valueBefore = this.combineObject(path.getJson(),valueBefore);
            }else {
                instance.addPath('/ext' + keyBefore,valueBefore);
                keyBefore = item.path;
                valueBefore = path.getJson();
            }
        });
        if(valueBefore){
            instance.addPath('/ext' + keyBefore,valueBefore);
        }
        resources.forEach(element => {
            const api = definitions.filter(item => {
                if (item[element]) {
                    return item;
                }
            })[0][element].api;
            const properties = definitions.filter(item => {
                if (item[element]) {
                    return item;
                }
            })[0][element].properties;
            const refs = definitions.filter(item => {
                if (item[element]) {
                    return item;
                }
            })[0][element].ref;
            instance.addApi(element, api, properties, refs);
        });

        // add definition
        definitions.forEach(item => {
            const key = Object.keys(item)[0];
            const properties = item[key].properties;
            const obj = new Definition();
            obj.setType('object')
            properties.forEach(item => obj.addProperty(item.name, {'type': item.type}))
            instance.addDefinition(Object.keys(item)[0], obj.getJson())
        })
        const fs = require('fs');
        fs.writeFileSync('./swagger.json', JSON.stringify(instance.getJson()));
        return swaggerUi.setup(instance.getJson(), options);
    }
    static setupProperties(properties,path,propertiesPath){
        for (let i = 0; i < properties.length; i++) {
            const obj = {
                name: properties[i].name,
                in: !!propertiesPath.find(name => name == properties[i].name)?'path':'formData',
                type: properties[i].type,
                description: 'đang cập nhật...',
                require: !!propertiesPath.find(name => name == properties[i].name)
            };
            path.addParams(obj);
        };
         return path;
    }

    static loadMeta(){
        if(Config.getNameFileMeta(PATH) === 'meta.yml'){
            return YAML.load('meta.yml');
        }else{
            return require(path.join(PATH,'meta.json'));
        }
    }
}

module.exports = SwaggerClient;