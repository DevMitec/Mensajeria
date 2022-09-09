//Checking the crypto module
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const algorithm = 'AES-256-CBC'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16).toString('base64');


///Encryptacion correcta
var encrypt = function (plain_text,secret) {   
   var iv64 = Buffer.from(iv, 'base64');
   var secret64 = Buffer.from(secret, 'base64');;
   var encryptor = crypto.createCipheriv(algorithm, secret64, iv64);
   //let encrypted = encryptor.final('base64') + encryptor.update(plain_text, 'utf8', 'base64');
   let encrypted = encryptor.update(plain_text, 'utf8');
   // return iv.concat(encrypted, encryptor.final());
   var result = Buffer.concat([ iv64, encrypted, encryptor.final() ] );
   // var result = Buffer.concat([ Buffer.from(iv), Buffer.from(encrypted) ] )

   //var encryptedByte = Buffer.from()
   return result.toString('base64');

   // var CryptoJSAES = CryptoJS.AES.encrypt(plain_text, 
   //    secret, 
   //    {
   //       keySize: 256 / 8,
   //       iv: IV, 
   //       mode: CryptoJS.mode.CBC, 
   //       padding:CryptoJS.pad.Pkcs7
   //    });
   // var CryptoJSAESByte = Buffer.from(CryptoJSAES, 'base64');

   // var CryptoJSAESByte2 = Buffer.concat([ iv, CryptoJSAESByte] )
};

//Encryptacion que eh usado de prueba
function AesEncrypt(text, keyAes) {

   var textByte = Buffer.from(text);
   var text64 = textByte.toString('base64');

   //keyAes =  Buffer.from(keyAes, "hex");
   // const cipher = crypto.createCipheriv('aes-256-cbc', keyAes, iv);
   // let encrypted = cipher.update(text);
   // encrypted = Buffer.concat([ iv, encrypted, cipher.final()] );
  

   // var textUTF8 = CryptoJS.enc.Base64.parse(text);
   // var Key = CryptoJS.enc.Base64.parse(keyAes.toString('base64')); //secret key
   // var IV = CryptoJS.enc.Base64.parse(iv.toString('base64')); //16 digit

   var Key64 = 'iHgTQ2k3l2gdDCNc3ZaQIC5NEnQzDuFrmqDP8JQDcTg=';
   var KeyIV64 = 'O4R8oDclfqyEC4N9SA9syg=='

   var bufferKey64 = Buffer.from(Key64, 'base64')
   var bufferKeyIV64 = Buffer.from(KeyIV64, 'base64')

   const cipher = crypto.createCipheriv(algorithm, Buffer.from(keyAes), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([ iv, encrypted, cipher.final()] );
   
   var encrypted2 = encrypted.toString('base64');

   // var textUTF8 = CryptoJS.enc.Utf8.parse(text);
   // var Key = CryptoJS.enc.Utf8.parse(Key64); //secret key
   // var IV = CryptoJS.enc.Utf8.parse(KeyIV64); //16 digit
   

   // var CryptoJSAES = CryptoJS.AES.encrypt(textUTF8, 
   //                                        Key, 
   //                                        {
   //                                           keySize: 256 / 8,
   //                                           iv: IV, 
   //                                           mode: CryptoJS.mode.CBC, 
   //                                           padding:CryptoJS.pad.Pkcs7
   //                                        });
   // var CryptoJSAESByte = Buffer.from(CryptoJSAES, 'base64');

   // var CryptoJSAESByte2 = Buffer.concat([ iv, CryptoJSAESByte] )
   //--------------------------------------------------------------------------
   // let cipher = crypto.createCipheriv('aes-256-cbc', keyAes, iv);
   
   // let encrypted = cipher.update(text);
   // //encrypted += cipher.final('base64');

   // encrypted = Buffer.concat([ cipher.final(), encrypted]);
   //return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

   // return iv.toString() + CryptoJSAES.toString();
   // var body = CryptoJSAESByte2.toString('base64');                                          
   return encrypted;
}

// Decrypting text
function AesDecrypt(text, keyAes) {
   
   let fullData = Buffer.from(text, "base64");
   const iv = Buffer.alloc(16);
   fullData.copy(iv, 0, 0, 16);

   let cipherData = Buffer.alloc(fullData.length - 16);
   fullData.copy(cipherData, 0, 16, fullData.length - 16);
   
   let key = Buffer.from(keyAes, 'base64');

   try {
      let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decrypted = decipher.update(cipherData);      
      
      return decrypted.toString("utf8");
   } catch (error) {
      console.log(error);
      return error;
   }
   
  
}

function getRSAKey(){
   return key;
}

function setRSAKey(publicKey){
   key = publicKey;
}

module.exports = {
   AesEncrypt,
   AesDecrypt,
   getRSAKey,
   encrypt,
   iv
}