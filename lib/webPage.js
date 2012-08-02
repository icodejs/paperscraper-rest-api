
var
resourceful = require('resourceful'),
url         = require('url'),
mime        = require('mime'),
config      = require('./config'),
common      = require('./common');

var WebPage = resourceful.define('webPage', function (id) {
  this.use('couchdb', {
    uri: config.db.webPage
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

function allJsonp(obj) {
  var
  req        = obj.req,
  parsedUrl  = url.parse(req.url, true),
  pathname   = parsedUrl.pathname,
  query      = obj.query || parsedUrl.query,
  pageUrl    = obj.pageUrl || query.url,
  method     = req.method,
  callbackId = query.callback,
  isJsonp    = callbackId.length > 0;

  all(function (err, webPages) {
    if (err) obj.callback(err);

    common.jsonpify({
      json: JSON.stringify(webPages),
      isJsonp: isJsonp,
      callbackId: callbackId
    }, function (jsonOutput) {

      return obj.callback(null, {
        contentType: mime.lookup('json'),
        output: jsonOutput,
        callbackId: callbackId
      });

    });
  });
}

function saveBatch(arr) {
  len = arr.length;
  w   = arr[len -1];

  create({
    category: w.category,
    url: w.url
  }, function (err, doc) {
      if (err)  {
        console.log(err);
      } else {
        console.log('success: ', w);
        console.log(len);

        if (len > 1) {
          var obj = arr.pop();
          saveBatch(arr);
        }

      }
  });
}

exports.all       = all;
exports.create    = create;
exports.saveBatch = saveBatch;
exports.allJsonp  = allJsonp;