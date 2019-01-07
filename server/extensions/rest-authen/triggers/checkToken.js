const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token.split(" ")[1], 'Bearer', (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }else {
            next(req,res);
        }
    });
}
module.exports = verifyToken;