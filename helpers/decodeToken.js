const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.decodeToken = (token) => {
    token = token.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const userId = decodedToken;
    return userId;
}