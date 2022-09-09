const axios = require('axios');
const url = require('url');
const CryptoJS = require('crypto-js');
const queryString  = require('query-string');


async function GetToken(tokenURL, content, headerAutorization, oauthConnectionTimeout){

    const params = queryString.stringify(content)
    var data;    
    
    await axios({
        method: 'post',
        url: tokenURL,
        data: content,
        timeout: oauthConnectionTimeout,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Basic ${headerAutorization}`,
            //'Cookie': 'XSRF-TOKEN=f606bfa1-a96e-4e39-9c57-3d01ea9a6264'
        }
        }) .then(async res => {
            // console.log(`statusCode: ${res.status}`);
            // console.log(`statusCode: ${res.data}`);
            data = res.data;
          })
          .catch(async error => {
            console.error('error:', error);
          });

    // console.log('data: ', data);
    return data.access_token;
}   

async function GetAES_HMAC(apikeyurl, accessToken, rsaObject, apiKeyConnectionTimeout){

  var data;
  await axios({
      method: 'post',
      timeout: apiKeyConnectionTimeout,
      url: apikeyurl,
      data: { rsa: rsaObject },
      headers: {            
          'Authorization': `Bearer ${accessToken}`,            
      }
      }) .then(async res => {
          console.log(`statusCode: ${res.status}`);
          console.log(`data: ${res.data}`);
          data = res.data;
        })
        .catch(async error => {
          console.error('error:', error);
        });

  return data;
}

async function GetMessage(url, mitHS, message, accessToken, serviceConnectionTimeout){

  var VERSION = (Buffer.from('V192CEAD6E')).toString('base64')
  var data;
  await axios({
    method: 'post',
    timeout: serviceConnectionTimeout,
    url: url,
    data: message,
    headers: {            
      'Authorization': `Bearer ${accessToken}`,        
      'Content-Type': 'text/plain',         
      'MIT-HS': mitHS,
      VERSION
    }
    }) .then(async res => {
        console.log(`statusCode: ${res.status}`);
        console.log(`data: ${res.data}`);
        data = res;
      })
      .catch(async error => {          
        console.error('error:', error);
        data = error.response;
      });

  return data;
}

async function GetMessageGCM(url, mitHS, message, accessToken, serviceConnectionTimeout){

  var data;
  await axios({
    method: 'post',
    timeout: serviceConnectionTimeout,
    url: url,
    data: message,
    headers: {            
      'Authorization': `Bearer ${accessToken}`,        
      'Content-Type': 'text/plain',         
      'MIT-HS': mitHS,      
    }
    }) .then(async res => {
        console.log(`statusCode: ${res.status}`);
        console.log(`statusCode: ${res.data}`);
        data = res;
      })
      .catch(async error => {          
        console.error('error:', error);
        data = error.response;
      });

  return data;
}

module.exports = {
    GetToken,
    GetAES_HMAC,
    GetMessage,
    GetMessageGCM
 }