//message.js is the hub of the system - messages go in, messages come out, that's what the Osaka seafood concern is all about
//There is a single function to pass in a message, and then all the registered callbacks are fired to pass it back out
var util = require("util");

var messages_array = new Array();

//Constructor for message object
function message(username, text, senderId, timestamp)
{
	try
	{
		this.id = messages_array[messages_array.length - 1].id + 1;
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

/*
 * input a message into the hub
 * returns sequential ID of the message
 */
function inputMessage(messageToInput)
{
	messages_array.push(messageToInput);
	console.log("Message inputted with value: " + messageToInput);
	console.log("");
	console.log("First element in array messages_array: " + JSON.stringify(messages_array[0]));
	console.log("Last element in array messages_array: " + JSON.stringify(messages_array[messages_array.length - 1]));
	console.log("");
	console.log("Full dump of messages_array: " + util.inspect(messages_array));
	return messages_array[messages_array.length - 1].id;
}

function getMessagesSinceId(idFrom)
{
	//Walk backwards through the array until we get too far, then return what we've got.
	var toReturn = Array();
	var arrayPointer = messages_array.length - 1;
	console.log("Value of arrayPointer: " + arrayPointer.toString());
	console.log("Dump of messages_array: " + util.inspect(messages_array));
	if (typeof messages_array[arrayPointer] == "undefined")
	{
		return false;
	}
	
	while(messages_array[arrayPointer].id >= idFrom)
	{
		toReturn.push(messages_array[arrayPointer])
		arrayPointer = arrayPointer - 1;
	}
	return toReturn;
	arrayPointer = null;
	toReturn = null;
}

function getMessageById(id)
{
	var arrayPointer = messages_array.length - 1;
	if (typeof messages_array[arrayPointer] == "undefined")
	{
		console.log("Could not find message with given ID");
		return false;
	}
	while(messages_array[arrayPointer].id != id)
	{
		arrayPointer = arrayPointer - 1;
	}
	
	if(typeof messages_array[arrayPointer] != "undefined")
	{
		console.log("found valid message in array of type:" + typeof messages_array[arrayPointer]);
		return messages_array[arrayPointer];
	}
	else
	{
		console.log("Failed to find valid message in array");
		return false;
	}
	
	arrayPointer = null;
}
	
	

exports.message = message;
exports.registerIncomingMessageCallback = registerIncomingMessageCallback;
exports.inputMessage = inputMessage;
exports.getMessageById = getMessageById;
exports.getMessagesSinceId = getMessagesSinceId;
