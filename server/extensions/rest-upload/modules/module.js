const UploadFile = require('./uploadFile');
const config = require('../../../template/rest-config').instance;
const global = config.global('server');
const upload = new UploadFile();
class Upload {
    constructor() {
        // this.upload = upload;
    }

    upFile(req, res) {
        let dir = req.body.dir;
        let name = req.body.name;
        console.log(req.body.name);
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let File = req.files;
        upload.saveFile(File,global.static,name,dir).then((data)=>{
            res.status(200).send({status:'success',data:data})
        })
    }

}

module.exports = Upload;