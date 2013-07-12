var fs = require("fs"); //For dealing with clients.json
var crypto = require("crypto"); //For calculating the hmacs


function verify(decoded_url_components,json_decoded_url_components)
{

	console.log("json_decoded_url_components: " + json_decoded_url_components);
	
	//Now find the HMAC
	var sentHmac = json_decoded_url_components[5].hmac;
	console.log("HMAC sent is: " + sentHmac);
	
	//Now we calculate the HMAC
	//First: find the correct client to use
	var clientServerAssignedId = json_decoded_url_components[1].serverAssignedId;
	console.log(clientServerAssignedId);
	
	//Second: obtain the key from the config file
	var clientConfigPath = "./clients/" + clientServerAssignedId + ".json";

	var clientConfig = fs.readFileSync(clientConfigPath);
	clientConfig = JSON.parse(clientConfig);
	console.log("Client config file: " + clientConfig);
	var clientHmacKey = clientConfig.hmacKey;
	
	console.log("Client HMAC key: " + clientHmacKey);
	
	//Now we have the information we need
	//Third: calculate the hmac
	
	var objHmac = crypto.createHmac("sha1", clientHmacKey);
	
	//Note to self: finalise what data goes into the HMAC-inator
	/*Data which goes in:
	 * clientData (1)
	 * requestMetaData (2)
	 * action (3)
	 * actionData (4)
	 * NOT authData because the Hmac itself is in there
	 * */
	 
	var dataToHmac = decoded_url_components[1] + decoded_url_components[2] + decoded_url_components[3] + decoded_url_components[4];
	objHmac.update(dataToHmac); //Put the data into the Hmac object
	console.log("Data to HMAC: \n" + dataToHmac);
	var calculatedHmac = objHmac.digest("hex");
	console.log("Calculated HMAC: " + calculatedHmac);
	console.log(sentHmac == calculatedHmac);
	
	//console.log(url_components);
	
	return sentHmac == calculatedHmac;
}

exports.verify = verify;
