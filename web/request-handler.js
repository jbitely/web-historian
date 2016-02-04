var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    console.log("request received: " + req);
    res.end();
  },
  'POST': function(req, res) {

  },
  'OPTIONS': function(req, res) {

  }
};
exports.handleRequest = function (req, res) {
  var action = req.method;

  if (action) {
    actions[action](req, res);
  } else {
    // TODO fix error!
    console.log("Whoops! There's an error.");
    res.end();
  }

  res.end(archive.paths.list);
};
