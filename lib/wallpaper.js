var
resourceful = require('resourceful'),
config      = require('./config');

var Wallpaper = resourceful.define('wallpaper', function (id) {
  this.use('couchdb', {
    uri: 'couchdb://paperscraper.iriscouch.com/wallpaper'
  });

  this.string('_id');
  this.string('category');
  this.string('filename');
  this.string('Description');
  this.string('imageSrc');
  this.string('originUrl');
  this.string('domain');
  this.string('fileSizeKB');
  this.string('width');
  this.string('height');
  this.string('altText');
  this.string('titleText');
  this.string('fileType');
  this.timestamps();
});

function create(obj, callback) {
  // check whether the image already exists first before you save
  obj._id = String(Date.now(), 10);
  Wallpaper.create(obj, function (err, wallpaper) {
    if (err) return callback(err);
    return callback(null, wallpaper);
  });
}

function all(callback) {
  Wallpaper.all(function (err, docs) {
    if (err) return callback(err);
    return callback(null, docs);
  });
}

exports.all    = all;
exports.create = create;