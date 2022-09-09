const crypto = require("crypto");
const CryptoJS = require('crypto-js');

function HmacSHA256Encrypt(data, key) {
    
    
    const gen_hmac = crypto.createHmac('sha256', Buffer.from(key, 'base64')).update(data, 'utf8').digest('base64');
    // data = hmac.update(data);
    // const gen_hmac = data.digest('bin');

    return gen_hmac;


    // var Data = CryptoJS.enc.Utf8.parse(data);
    // var Key = CryptoJS.enc.Utf8.parse(key); //secret key

    // var hmac = CryptoJS.HmacSHA256(Data, Key);
    // var hash = hmac.toString(CryptoJS.enc.Base64);
    // return hash;
}

module.exports = {
    HmacSHA256Encrypt
}