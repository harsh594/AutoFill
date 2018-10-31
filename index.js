var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
 handle["/"] = requestHandlers.index;
 handle["/index.html"] = requestHandlers.index;

 handle["/css/style.css"] = requestHandlers.style;

//  handle["/js/index.js"] = requestHandlers.scriptIndex;
 handle["/js/script.js"] = requestHandlers.scriptScript;
//  handle["/js/require.js"] = requestHandlers.scriptRequire;

 handle["/awslink.json"] = requestHandlers.jsonAWSLink;

server.index(router.route, handle);