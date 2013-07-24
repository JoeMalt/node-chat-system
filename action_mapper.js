//Map the value of the HTTP "action" string to the appropriate function
//Returns appropriate function
function mapHttpRequest(action)
{
	switch(action)
	{
		case "sendMessage":
		return require("./send_message.js").sendMessage;
		break;
		
		case "readMessageById":
		return require("./read_message.js").readMessageById;
		break;
		
		default:
		return false;
		break;
	}
}

exports.mapHttpRequest = mapHttpRequest;
