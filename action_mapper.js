//Map the value of the HTTP "action" string to the appropriate function
//Returns appropriate function
function mapHttpRequest(action)
{
	switch(action)
	{
		case sendMessage:
		return require("./sendMessage.js").sendMessage;
		break;
		
		case readMessage:
		return require("./readMessage.js").readMessage;
		break;
		
		default:
		return false;
		break;
	}
}

exports.mapHttpRequest = mapHttpRequest;
