const crypto = require("crypto");

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,  
  
});
console.log('privateKey', getPrivateKeyRSA.toString('base64'));

function RSAencryptedData(data){

    return crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(data)
      );
}

function RSAdecryptedData(encryptedData) {

  
  ///var encryptedData64 = atob(encryptedData);
  let Ciphertext = Buffer.from(encryptedData, "base64")
  var Decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_PADDING,
      ///oaepHash: "sha256",
    },
    Ciphertext
  );

  return Decrypted.toString("base64");
}

function getPublicKeyRSA(){
    return publicKey.export({
		type: "spki",
    format: "der",
		// format: "der",
	});
}

function getPrivateKeyRSA(){
    return privateKey.export({
		type: "pkcs8",
    format: "der",
		// format: "der",
	});
}

const verifiableData = "this need to be verified";

// The signature method takes the data we want to sign, the
// hashing algorithm, and the padding scheme, and generates
// a signature in the form of bytes
function signature(verifiableData){
    return crypto.sign("sha256", Buffer.from(verifiableData), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      });
} 

//console.log(signature.toString("base64"));

// To verify the data, we provide the same hashing algorithm and
// padding scheme we provided to generate the signature, along
// with the signature itself, the data that we want to
// verify against the signature, and the public key
function isVerified(verifiableData){
    return crypto.verify(
        "sha256",
        Buffer.from(verifiableData),
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        signature
      );
} 

module.exports = {
    RSAencryptedData,
    RSAdecryptedData,
    getPublicKeyRSA,
    getPrivateKeyRSA
 }