var hmac_verifier = require("./hmac_verifier.js");
var query_string_handler = require("./query_string_handler.js");
var action_mapper = require("./action_mapper.js");

function route(pathname, request, response)
{
	console.log("Starting route request for: " + pathname);
	var url_components = pathname.substr(1).split("/");
	var decoded_url_components = query_string_handler.urlDecodeAll(url_components);
	var json_decoded_url_components = query_string_handler.jsonParseAll(decoded_url_components);
	//console.log(url_components);
	
	//Validation check 1: is this an actual request?
	//Check by looking for /request/ as the first querystring component
	if(url_components[0] !== "request")
	{
		console.log("Invalid request: failed check 1");
		response.writeHead(400, "Bad request");
		response.end();
		return;
	}
	
	//Validation check 2: HMAC verification
	if(!hmac_verifier.verify(decoded_url_components, json_decoded_url_components)) //Passing the same data twice is ugly, but it's better than parsing it to JSON twice - I think :/
	{
		console.log("Invalid request: failed check 2 (HMAC)");
		response.writeHead(400, "Bad request");
		response.end();
		return;
	}
	
	//Get the "action" value
	var strAction = json_decoded_url_components[3].action;
	console.log("Action string: " + strAction);
	var actionFunction = action_mapper.mapHttpRequest(strAction);
	if(typeof actionFunction !== "function")
	{
		//error handling
		console.log("action_mapper returned false");
		response.writeHead(400, "Bad request");
		response.end();
	}
	else
	{
		console.log("action_mapper returned valid function");
	}
	
	//Finally: actually call the requested function
	actionFunction(json_decoded_url_components, request, response);
}


exports.route = route;
