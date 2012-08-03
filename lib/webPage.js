
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
  isJsonp    = typeof callbackId === 'undefined' ? false : callbackId.length > 0;

  console.log('isJsonp: ', isJsonp);

  all(function (err, webPages) {
    var o = {
      contentType: mime.lookup('js'),
      callbackId: callbackId
    };

    common.jsonpify({
      json: JSON.stringify(webPages),
      isJsonp: isJsonp,
      callbackId: callbackId
    }, function (jsonOutput) {
      if (err) {
        return obj.callback(err, o);
      } else {
        o.output = jsonOutput;
        return obj.callback(null, o);
      }
    });
  });
}

function saveBatch(arr) {
  l = arr.length;
  w = arr[len -1];

  create({
    category: w.category,
    url: w.url
  }, function (err, doc) {
      if (err)  {
        console.log(err);
      } else {
        console.log('success: ', w);
        console.log(l);

        if (l > 1) {
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