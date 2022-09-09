const ENVEIROMENT = {
    DEV: 'dev',
    PROD: 'prod',
    QA: 'qa'
}

let _Enveirmoent;

function constructor(enveirmoent){
    
    if(!_.has(this.ENVEIROMENT, enveirmoent)){
        throw "Error"
    }

}

function getUrlToekn(enveirmoent){
    let url = null;
    switch (enveirmoent) {
        case 'dev':
            url = "devauth.mit.com.mx";
            break;
        
        case 'prod':
            url = "auth.mit.com.mx";
            break;

        case 'qa':
            url = "qaauth.mit.com.mx";
            break;

        default:
            break;
    }
}
module.exports = {
    ENVEIROMENT,
    getUrlToekn
 }
