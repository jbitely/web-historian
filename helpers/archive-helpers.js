var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(listType, callback){ // TODO: implment list type checking
  var list = "";
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      console.log("ERROR: Could not read file");
    } else{
      list = data.toString();
      list = list.split("\n");
      callback(list);
    }
  });
};

exports.isUrlInList = function(url, listType){
  exports.readListOfUrls(listType, function(list) {
    console.log('Is '+ url + " in " + list + "? " + _.contains(list, url));
    return _.contains(list, url);
  });
};

exports.addUrlToList = function(url, listType){

};

exports.isUrlArchived = function(url){
  return exports.isUrlInList(url, "archived");
};

exports.downloadUrls = function(){
};
