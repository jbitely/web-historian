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
    var url = "";
    req.on("data", function(chunk){
      url+=chunk;
    }).on("end", function(){
      var list = archive.readListOfUrls('urls'); // obj { 'url': true (archived) or false (not archived)}
      if (archive.isUrlInList(url, list)) {
        var archiveList = archive.readListOfUrls('archived');
        if (archive.isUrlArchived(url, archiveList)) {
          httpHelpers.getAssets(res, 'archive', url);
        } else {
          httpHelpers.getAssets(res, 'static', '/loading.html');
        }
      } else {
        archive.addUrlToList(url, 'urls');
        console.log("Success! " + url + " has been submitted for archiving.")
      }
      // check if url in list
        // if yes
          // if available serve
          // else serve loading
        // if no write to list
          // tell user request made
    });
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
