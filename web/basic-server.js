var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParser = require("url");
var httpHelpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
// handler.handleRequest

initialize();

var routes = {
  '/': function(req, res) {
    httpHelpers.getAssets(res, 'static', '/index.html');
  },
  '/styles.css': function(req, res) {
    httpHelpers.getAssets(res, 'static', '/styles.css');
  },
  '/archive': function(req, res) {
    httpHelpers.requestHandler(req, res);
  }
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
  var parts = urlParser.parse(req.url);
  console.dir(parts);
  var path = urlParser.parse(req.url).pathname; // should be all the parts?
  var route = routes[path];
  if (route) {
    route(req, res);
  } else {
    // Error!
  }

});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

