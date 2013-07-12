//Utilities for handling the query string

var url = require("url");

/*
 * takes an array (designed for the url_components array) and URL-decodes each element
 * uses unescape() function built into V8
 */
function urlDecodeAll(url_components)
{
	var decoded_url_components = [];
	url_components.forEach(function(value, index, array){
		decoded_url_components[index] = unescape(value);
	});
	return decoded_url_components;
}


/*
 * Takes an already URL-decoded (see above) array and parses it all as JSON
 * uses JSON.parse()
 */
function jsonParseAll(decoded_url_components)
{
	var json_decoded_url_components = [];
	decoded_url_components.forEach(function(value, index, array){
		try
		{
			json_decoded_url_components[index] = JSON.parse(value);
		}
		catch (e) //Not valid JSON, just set value to as it was in original array
		{
			json_decoded_url_components[index] = value;
		}
	});
	return json_decoded_url_components;
}

exports.urlDecodeAll = urlDecodeAll;
exports.jsonParseAll = jsonParseAll;


