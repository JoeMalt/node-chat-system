//message.js is the hub of the system - messages go in, messages come out, that's what the Osaka seafood concern is all about
//There is a single function to pass in a message, and then all the registered callbacks are fired to pass it back out

var messages = new Array();

//Constructor for message object
function message(username, text, timestamp, sender_id)
{
	this.username = username;
	this-text = text;
	this.timestamp = timestamp;
	this.sender_id = sender_id;
}

exports.message = message;

//Different APIs can register callback functions in this array: when a new message comes in, each function is fired.

var incomingMessageCallbacks = new Array();

function registerIncomingMessageCallback(callback)
{
	try
	{
		incomingMessageCallbacks.push(callback);
	}
	catch (e)
	{
		return false;
	}
	return true;
}


function inputMessage(message)
{
	messages.push(message);
	console.log("Message inputted with value: " + message);
	console.log(messages);
}

exports.message = message;
exports.registerIncomingMessageCallback = registerIncomingMessageCallback;
exports.inputMessage = inputMessage;
