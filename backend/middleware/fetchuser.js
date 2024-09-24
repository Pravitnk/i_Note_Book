// middleware is function that will be called whenever a request  will be made in the 'login required' route
var JWT = require('jsonwebtoken');
// const { modelName } = require('../models/User');
const JWT_SECRET = 'pravitisaniceguy';


const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req obj
    const token = req.header('auth-token'); // get token from the header
    if (!token) {
        // if token is not present show error
        res.status(401).send({ error: "please authenticate using a valid token" });
    }
    try {
        const data = JWT.verify(token, JWT_SECRET);
        req.user = data.user;
        next(); // if valified then execute the next function
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" });
    }
}
module.exports = fetchuser;