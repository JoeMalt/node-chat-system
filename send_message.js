var messageHub = require("./message_hub.js");

function sendMessage()
{
	console.log("sendMessage called");
	messageHub.inputMessage("This should not be a string, but hey");
}

exports.sendMessage = sendMessage;
