//Several functions for reading out messages (single or multiple)

var messageHub = require("./message_hub.js");

function readMessageById(json_decoded_url_components, request, response)
{
	var id = json_decoded_url_components[4].id;
	console.log("readMessageById called");
	var message = messageHub.getMessageById(id);
	if (message == false)
	{
		response.writeHead(404, "Bad message ID");
	}
	else
	{
		console.log("Var message: " + message);
		var output = JSON.stringify(message);
		console.log("Output from valid readMessageById: " + output);
		response.write(output);
		response.end();
	}
}

function readMessagesSinceId(json_decoded_url_components, request, response)
{
	
}

exports.readMessageById = readMessageById;

