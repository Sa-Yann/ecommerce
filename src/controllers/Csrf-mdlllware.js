// let crypto = require('crypto')

module.exports = class CryptoToken {

    createToken() {
        return require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    };

}



