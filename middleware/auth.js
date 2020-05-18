const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next){
    //Get Token from Header
    const token = req.header('x-auth-token');

    //If Token doesn't exist, raise a 401 Unauthorized Status
    if(!token){
        return res.status(401).json({msg: "Unauthorized"});
    }

    try {
        //Decoding the Token
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        //Extracted User is assigned to req.user so that it can be accessed inside the routes.
        //The extracted user will be used to pull all the corresponding data from the DB via the ID
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}