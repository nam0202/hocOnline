const path = require('path');
const config = require('../../../template/rest-config').instance;
const global = config.global('server');
class Upload {
    constructor() {
    }

    mv(f, dir) {
        return new Promise((resolve, reject) => {
            console.log(dir);
            f.mv(dir, (error) => {
                if (error) {
                    reject(error);
                } else {
                    dir = dir.replace(global.static, '');
                    resolve(dir);
                }
            })
        })
    }

    saveFile(files, dir,outName,extDir) {
        if(!!extDir){
            dir = path.join(dir,extDir);
        }
        let Dir = [];
        let keys = Object.keys(files);
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < keys.length; i++) {
                let inName = outName || Date.now();
                let dirSave = path.join(dir, inName + '.' + this.getExt(files[keys[i]]));
                await this.mv(files[keys[i]], dirSave).then((data) => {
                    Dir.push({ name: this.getName(files[keys[i]]), link: data });
                }).catch((err) => {
                    Dir.push({ name: this.getName(files[keys[i]]), error: err });
                });
            }
            resolve(Dir);
        })
    }

    getName(file) {
        return file.name;
    }

    getExt(file) {
        return file.name.split('.')[1];
    }

    getType(file) {
        return file.mimetype.split('/')[0];
    }


}

module.exports = Upload