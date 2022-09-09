
const crypto = require('crypto');
const { Module } = require('module');
const algorithm = 'aes-256-gcm';

function GcmDecrypt (messagebase64, keyB64)  {
    keyB64 = Buffer.from(keyB64, "base64");
    let fullData = Buffer.from(messagebase64, "base64");
    console.log(fullData.length)
    const iv = Buffer.alloc(12);
    fullData.copy(iv, 0, 0, 12);
    const auth = Buffer.alloc(16);
    fullData.copy(auth, 0, fullData.length - 16, fullData.length);
    let cipherData = Buffer.alloc(fullData.length - 28);
    fullData.copy(cipherData, 0, 12, fullData.length - 16);
    fullData = null;
    const decipher = crypto.createDecipheriv(algorithm, keyB64, iv);
    decipher.setAuthTag(auth);
    let str = decipher.update(cipherData, "base64", "utf8");
    str += decipher.final("utf8");
    return str;
};

function GCMEncrypt(plaintText, KeyB64){

    var nonce = crypto.randomBytes(12).toString('base64');        
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(KeyB64, 'base64'), Buffer.from(nonce, 'base64'));
    let encrypted = cipher.update(plaintText, 'utf8');
    // var tag = cipher.getAuthTag();

    var arrayConcat = Buffer.concat([Buffer.from(nonce, 'base64'), encrypted, cipher.final(), cipher.getAuthTag()]).toString("base64");
    
    return arrayConcat;
}

module.exports = {
    GcmDecrypt,
    GCMEncrypt
}