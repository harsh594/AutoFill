
var saveAs = require('file-saver');
var fs = require("fs");
var FileReader = require('filereader');
var OK = 200;

var querystring = require("querystring");
var aws = require('./amazon.js');

// ******************************************************************************* html *************************************************************************
function index(response, postData, pathname, type) {
 	console.log("index request is handled");
	 var file = "./public" + pathname;
     fs.readFile(file, ready);
     function ready(err, content) { deliver(response, type, err, content); }
 }
 
// ******************************************************************************* css *************************************************************************
function style(response, postData, pathname, type){
	console.log("style.css request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* javascript *************************************************************************
function scriptScript(response, postData, pathname, type){
	console.log("script request is handled");	
	var file = "./public" + pathname;
	fs.readFile(file, ready);
	function ready(err, content) { deliver(response, type, err, content);}
}

// ******************************************************************************* images *************************************************************************


// ******************************************************************************* json ***************************************************************************
function jsonAWSLink(response, postData, pathname, type){
	console.log("Amazon server request is handled");
	var data = querystring.parse(postData);
	aws.awsConnection(data, function(result){
		type = "application/json";
		var err;
		// console.log(result);
		// content = result;
		var json = JSON.stringify(eval("(" + result + ")"));
		deliver(response, type, err, json);
	});
	// content = '{data:1}';
	// var json = JSON.stringify(eval("(" + content + ")"));
}

 exports.index = index;
 exports.style = style;

 exports.scriptScript = scriptScript;
 exports.jsonAWSLink = jsonAWSLink;

// Deliver the file that has been read in to the browser.
function deliver(response, type, err, content) {
    if (err) {
    	return fail(response, NotFound, "File not found");
    }
    var typeHeader = { "Content-Type": type };
    response.writeHead(OK, typeHeader);
    response.write(content);
    response.end();
}
