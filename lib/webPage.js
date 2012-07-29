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
  // check whether the web page already exists first before you save
  obj._id = String(Date.now(), 10);
  WebPage.create(obj, function (err, webPage) {
    if (err) return callback(err);
    return callback(null, webPage);
  });
}

function all(callback) {
  WebPage.all(function (err, docs) {
    if (err) return callback(err);
    return callback(null, docs);
  });
}

exports.all    = all;
exports.create = create;