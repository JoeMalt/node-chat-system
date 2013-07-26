var messageHub = require("./message_hub.js");
var crypto = require("crypto");

function sendMessage(json_decoded_url_components, request, response)
{
	console.log("sendMessage called");
	var username = json_decoded_url_components[4].username;
	var text = json_decoded_url_components[4].text;
	var senderId = json_decoded_url_components[1].serverAssignedId
	var timestamp = Math.round((new Date()).getTime() / 1000);
	
	var messageToInput = new messageHub.message(username, text, senderId, timestamp);
	console.log("Message object before submission: " + JSON.stringify(messageToInput));
	var id = messageHub.inputMessage(messageToInput);
	messageToInput = null;
	
	//Now send the response, including a SHA-1 digest of the username and message
	var hash = crypto.createHash("sha1").update(username);
	hash.update(text);
	var digest = hash.digest("hex");
	hash = null;
	
	response.writeHead(200, "Request OK");
	var responseData = '{"id":"' + id + '","digest":"' + digest + '"}';
	response.write(responseData);
	response.end();
}
exports.sendMessage = sendMessage;
