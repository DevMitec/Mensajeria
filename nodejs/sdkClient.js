
const enveirmoent = require('./models/Environment');
const protectData = require('./services/ProtectData');
const httpRequest = require('./services/HttpRequest');
const AesServices = require('./services/AesServices');
const hmacServices = require('./services/HmacServices');
const RsaServices = require('./services/RsaServices');
const GcmServices = require('./services/GcmServices');

let _url = '';
let _URLtoken = '';
let _URLapiKey = '';
let _clientId = '';
let _clientSecret = '';
let _scopes;
let _oauthConnectionTimeout = 20000;
let _apiKeyConnectionTimeout = 20000;
let _serviceConnectionTimeout = 20000;
let _VERSION = ''

const VERSION_192CEAD6E = "V192CEAD6E";
const VERSION_GCM = "VERSION_GCM";

function initialize(url, URLtoken, URLapiKey, clientId, clientSecret, scopes, VERSION = ''){

    _url = url;
    _URLtoken = URLtoken;
    _URLapiKey = URLapiKey;
    _clientId = clientId;
    _clientSecret = clientSecret;
    _scopes = scopes;
    _VERSION = VERSION;
}

function setOauthConnectionTimeout(oauthConnectionTimeout){
    _oauthConnectionTimeout = oauthConnectionTimeout;
}

function setApiKeyConnectionTimeout(apiKeyConnectionTimeout){
    _apiKeyConnectionTimeout = apiKeyConnectionTimeout;
}

function setServiceConnectionTimeout(serviceConnectionTimeout){
    _serviceConnectionTimeout = serviceConnectionTimeout;
}

async function postRequest(payload){
    var decrypt = '';

    try {
        var content = protectData.ContentMitCognito(_scopes);
        var header = protectData.headerAutorization(_clientId, _clientSecret);

        var token = await httpRequest.GetToken(_URLtoken, content, header, _oauthConnectionTimeout);

        var keyRSA = RsaServices.getPublicKeyRSA().toString('base64');
        var keyPrivateRSA = RsaServices.getPrivateKeyRSA().toString('base64');

        var ResponseKey = await httpRequest.GetAES_HMAC(_URLapiKey, token, keyRSA, _apiKeyConnectionTimeout);

        var aes = RsaServices.RSAdecryptedData(ResponseKey.aes);
        var hmac = RsaServices.RSAdecryptedData(ResponseKey.hmac);
    
        var mitHS = hmacServices.HmacSHA256Encrypt(payload, hmac);
    
        if (_VERSION == VERSION_192CEAD6E) {
            var bodyToSend = AesServices.encrypt(payload, aes);
            var responseMessage = await httpRequest.GetMessage(_url, mitHS, bodyToSend, token, _serviceConnectionTimeout);
            
            if (responseMessage.status == 200) {
                decrypt = AesServices.AesDecrypt(responseMessage.data, aes);
                console.log('Desencriptaciond el Mensaje Recivido: ', decrypt);
            }else{
                decrypt = `Status: ${responseMessage.status}, Respuesta Enviar Mensaje:  ${responseMessage.statusText}`;
            }
        }else{
            var bodyToSend = GcmServices.GCMEncrypt(payload, aes);
            var responseMessage = await httpRequest.GetMessageGCM(_url, mitHS, bodyToSend, token, _serviceConnectionTimeout);

            if (responseMessage.status == 200) {
                decrypt = GcmServices.GcmDecrypt(responseMessage, aes);
                console.log('Desencriptaciond el Mensaje Recivido: ', decrypt);
            }else{
                decrypt = GcmServices.GcmDecrypt(responseMessage.data, aes);
                // decrypt = `Status: ${responseMessage.status}, Respuesta Enviar Mensaje:  ${responseMessage.statusText}`;
            }            
        }
    } catch (error) {
        decrypt = error;
    }
            
    return decrypt;
    
}

module.exports = {
    initialize,
    postRequest,
    VERSION_192CEAD6E,
    VERSION_GCM,
    setOauthConnectionTimeout,
    setApiKeyConnectionTimeout,
    setServiceConnectionTimeout
 }