var messageHub = require("./message_hub.js");

function sendMessage(json_decoded_url_components, request, response)
{
	console.log("sendMessage called");
	var username = json_decoded_url_components[4].username;
	var text = json_decoded_url_components[4].text;
	var senderId = json_decoded_url_components[1].serverAssignedId
	var timestamp = Math.round((new Date()).getTime() / 1000);
	var messageToInput = messageHub.message(username, text, senderId, timestamp);
	//console.log("Message object before submission: " + messageToInput);
	messageHub.inputMessage(messageToInput);
}
exports.sendMessage = sendMessage;
