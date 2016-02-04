var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.fileTypes = {
  ".html" : 'text/html',
  ".css" : 'text/css'
}

exports.getAssets = function(res, type, asset){ // TODO: possibly move into serveAssets
  if (type === 'static') {
    type = archive.paths.siteAssets;
  } else if (type === 'archive') {
    // do something else
  }
  asset = type + asset;// path join /index.html
  var ext = path.extname(asset);
  if(ext){
    if(exports.fileTypes[ext]){
        exports.headers["Content-Type"] = exports.fileTypes[ext];
    } else {
      console.log("Error; filetype not recognized.")
    }
  } else {
    exports.headers["Content-Type"] = 'text/html'
  }
  exports.serveAssets(res, asset, function(error, content){
    if(error){
      console.log("Error: ", error);
    } else {
      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
}

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, callback);

  console.log("serveAssets called with: ", asset);

  // callback()
};



// As you progress, keep thinking about what helper functions you can put here!
