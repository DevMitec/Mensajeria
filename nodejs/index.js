// const AES = require('./services/AesServices')


// try {
//     var encrypt = AES.AesEncrypt("Hola Mundo");
//     console.log('encrypt', encrypt);

//     var decrypt = AES.AesDecrypt(encrypt)
//     console.log('decrypt', decrypt);
// } catch (error) {
//     console.log('error', error);
// }


const sdkMit = require('./sdkClient')

/*
    Encryot AES
*/
var clientId = "1dpv2nll72fb9v29cvu8joj6qp";
var clientSecret = "5f1agt5mjbkkjh79f8nsbc19rnpo5orkl8sfmvc8gegkpeo4dnq";
var scopes = ["msec/genKey", "pgs/cobro"];
var url = "https://dev3.mitec.com.mx/pgs/vs/cobroXml";
var payload = "{\"paymentService\":{\"idCompany\":\"1111\",\"iataAgency\":\"86168616\",\"iataAirline\":\"139\",\"country\":\"MEX\",\"user\":\"1111AGTR\",\"password\":\"C3BVE73Z\",\"reference\":\"TRAVELPORT-1\",\"tpOperation\":\"30\",\"creditCardType\":\"V/MC\",\"creditCardName\":\"USUARIOTESTMITQA\",\"creditCardNumber\":\"4941330101282783\",\"creditCardExpMonth\":\"12\",\"creditCardExpYear\":\"25\",\"creditCardCVV\":\"123\",\"initialDeferment\":\"00\",\"numberOfPayments\":\"00\",\"planType\":\"00\"},\"transaction\":{\"transactionTS\":\"2022-03-18\",\"currency\":\"MXN\",\"amount\":\"100.00\",\"totalTickets\":\"1\",\"orderSource\":\"500\",\"departureDate\":\"2022/03/22\",\"completionDate\":\"2022/03/22\",\"response\":\"1\",\"customField1\":\"PCB347\"}}";
var setTokenURL = "https://devauth.mit.com.mx/oauth2/token";
//var setTokenURL = "https://qa-auth.mitidentity.com/oauth2/token";
var setApiKeyUrl = "https://devsigma.mitec.com.mx/msgTknCore/genKeys"

sdkMit.initialize(url, setTokenURL,setApiKeyUrl, clientId, clientSecret, scopes, sdkMit.VERSION_192CEAD6E);

/*
    Encryot GCM
*/

// var clientId = "29veq40t2o09kosv9el08avgjn";
// var clientSecret = "upsk36p3des36b5frb502fmj4mitim37a5gstkdht57j24afcii";
// var scopes = ["msec/genKey", "wscobroairlines/pymtAgencies"];
// var url = "https://dev3.mitec.com.mx/wscobroairlines/pymtAgencies";
// var payload = "{\"paymentService\":{\"idCompany\":\"1111\",\"iataAgency\":\"86168616\",\"iataAirline\":\"139\",\"country\":\"MEX\",\"user\":\"1111AGTR\",\"password\":\"C3BVE73Z\",\"reference\":\"TRAVELPORT-1\",\"tpOperation\":\"30\",\"creditCardType\":\"V/MC\",\"creditCardName\":\"USUARIOTESTMITQA\",\"creditCardNumber\":\"4941330101282783\",\"creditCardExpMonth\":\"12\",\"creditCardExpYear\":\"25\",\"creditCardCVV\":\"123\",\"initialDeferment\":\"00\",\"numberOfPayments\":\"00\",\"planType\":\"00\"},\"transaction\":{\"transactionTS\":\"2022-03-18\",\"currency\":\"MXN\",\"amount\":\"100.00\",\"totalTickets\":\"1\",\"orderSource\":\"500\",\"departureDate\":\"2022/03/22\",\"completionDate\":\"2022/03/22\",\"response\":\"1\",\"customField1\":\"PCB347\"}}";
// var setTokenURL = "https://devauth.mit.com.mx/oauth2/token";
// //var setTokenURL = "https://qa-auth.mitidentity.com/oauth2/token";
// var setApiKeyUrl = "https://devsigma.mitec.com.mx/msgTknCore/genKeys"

// sdkMit.initialize(url, setTokenURL,setApiKeyUrl, clientId, clientSecret, scopes, sdkMit.VERSION_GCM);

const start = async () => {
    sdkMit.postRequest(payload).then( async res => {
        console.log('Respuesta: ', res);
    }).catch(async error => {
          console.error('error:', error);
        });;
}

start();


