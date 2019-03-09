const UploadFile = require('./uploadFile');
const config = require('../../../template/rest-config').instance;
const global = config.global('server');
const upload = new UploadFile();
class Upload {
    constructor() {
        // this.upload = upload;
    }

    upFile(req, res) {
        let dir = req.query.dir;
        let name = req.query.name;
        console.log(req.query);
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let File = req.files;
        upload.saveFile(File,global.static,name,dir).then((data)=>{
            res.status(200).send({status:'success',data:data})
        }).catch(err=>console.log('err',err));
    }

}

module.exports = Upload;