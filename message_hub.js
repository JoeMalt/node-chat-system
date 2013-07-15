//message.js is the hub of the system - messages go in, messages come out, that's what the Osaka seafood concern is all about
//There is a single function to pass in a message, and then all the registered callbacks are fired to pass it back out

var messages = new Array();

//Constructor for message object
function message(username, text, senderId, timestamp)
{
	try
	{
		this.id = messages[messages.length].id + 1;
	}
	catch (TypeError)
	{
		this.id = 1;
	}
	this.username = username;
	this.text = text;
	this.timestamp = timestamp;
	this.senderId = senderId;
	return this;
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


function inputMessage(messageToInput)
{
	messages.push(messageToInput);
	console.log("Message inputted with value: " + message);
	console.log(messages[0]);
}

function getAllMessagesSinceId(idFrom)
{
	var toReturn = Array();
	var arrayPointer = messages.length;
	while(messages[arrayPointer].id >= idFrom)
	{
		toReturn.push(messages[arrayPointer])
	}
	return toReturn;
}

exports.message = message;
exports.registerIncomingMessageCallback = registerIncomingMessageCallback;
exports.inputMessage = inputMessage;
