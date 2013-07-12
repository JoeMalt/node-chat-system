var http = require("http");
var router = require("./router.js");
var url = require("url");

function start() {
	var server = http.createServer(onRequest);

	server.listen(1234);
}

function onRequest(request, response)
{
	var pathname = url.parse(request.url).pathname;
	console.log("Received HTTP request for: " + pathname);
	router.route(pathname, request, response);
	
	response.end();
}

exports.start = start;

