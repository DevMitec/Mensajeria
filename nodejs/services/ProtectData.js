

function ContentMitCognito(scopes){
    var content = "grant_type=client_credentials&scope=" + scopes.join(" ");
    // var content = {
    //     "grant_type": 'client_credentials',
    //     "scope": scopes.join(' ')
    // }
    return content;
}

function headerAutorization(clientId, clientSecret){
    var headerString = clientId + ":" + clientSecret;
    
    return btoa(headerString);
}

function toBytes(string){
	const buffer = Buffer.from(string, 'utf8');
	const result = Array(buffer.length);
	for (var i = 0; i < buffer.length; i++) {
		result[i] = buffer[i];
	}
	return result;
};

module.exports = {
    ContentMitCognito,
    headerAutorization
 }