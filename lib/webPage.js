var
resourceful = require('resourceful'),
config      = require('./config');

var WebPage = resourceful.define('webPage', function (id) {
  this.use('couchdb', {
    uri: 'couchdb://paperscraper.iriscouch.com/web_page'
  });

  this.string('_id');
  this.string('category');
  this.string('url');
  this.timestamps();
});

function create(obj, callback) {
  obj._id = String(Date.now(), 10);
  WebPage.create(obj,
    function (err, webPage) {
      if (err) {
        return callback(err);
      }
      return callback(null, webPage);
  });
}

function getWebPages(callback) {
  WebPage.all(function (err, docs) {
    if (err) {
      return callback(err);
    }

    //var records = docs;

    return callback(null, docs);
  });
}

exports.getWebPages = getWebPages;
exports.create      = create;