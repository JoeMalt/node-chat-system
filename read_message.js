//Several functions for reading out messages (single or multiple)

var messageHub = require("./message_hub.js");
var util = require("util");

function readMessageById(json_decoded_url_components, request, response)
{
	var id = json_decoded_url_components[4].id;
	console.log("readMessageById called");
	var message = messageHub.getMessageById(id);
	if (message == false)
	{
		response.writeHead(404, "Message not found");
	}
	else
	{
		console.log("Var message: " + message);
		var output = JSON.stringify(message);
		console.log("Output from valid readMessageById: " + output);
		response.writeHead(200, "Request OK");
		response.write(output);
		response.end();
	}
}

function readMessagesSinceId(json_decoded_url_components, request, response)
{
	var id = json_decoded_url_components[4].id;
	console.log("readMessagesSinceId called");
	var messagesReturned = messageHub.getMessagesSinceId(id);
	if (messagesReturned === false)
	{
		response.writeHead(404, "No messages found");
		response.end();
		return;
	}
	response.writeHead(200, "Request OK");
	response.write(JSON.stringify(messagesReturned));
	response.end;
}

function readMessagesSinceTime(json_decoded_url_components, request, response)

exports.readMessageById = readMessageById;
exports.readMessagesSinceId = readMessagesSinceId;
