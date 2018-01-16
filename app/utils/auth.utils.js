const jwt = require('jsonwebtoken');
const idToken = 'id_token'


const jwtConfig = {
    secret: 'my-secret'
};

module.exports = {
    createToken: function createToken(user) {
        console.log('Create token', user)
        return jwt.sign({email: user.email}, jwtConfig.secret, {expiresIn: 60 * 60 * 60 /*secs*/});
    },

    decodeToken: function decodeToken(token) {
        return jwt.decode(token, jwtConfig.secret);
    },

    verifyToken: function verifyToken(token) {
        return new Promise(function (resolve) {
            jwt.verify(token, jwtConfig.secret, null, function (err) {
                if (err) {
                    return resolve(false)
                }
                return resolve(true)
            })
        })
    }
};

