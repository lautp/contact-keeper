const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

module.exports = function(req, res, next) {
    //Get Token from Header

    const token = req.header('x-auth-token');

    //Check for token

    if(!token){
        res.status(401).json({msg: 'No Token, auth denied'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Invalid Token'});
    }
}