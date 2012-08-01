var
resourceful = require('resourceful'),
config      = require('./config');

var SearchTerm = resourceful.define('searchTerm', function (id) {
  this.use('couchdb', {
    uri: config.db.searchTerm
  });

  this.string('_id');
  this.string('category');
  this.string('name');
  this.timestamps();
});

function create(obj, callback) {
  // check whether the image already exists first before you save
  obj._id = String(Date.now(), 10);
  SearchTerm.create(obj, function (err, searchTerm) {
    if (err) return callback(err);
    return callback(null, searchTerm);
  });
}

function all(callback) {
  SearchTerm.all(function (err, docs) {
    if (err) return callback(err);
    return callback(null, docs);
  });
}

function saveBatch(arr) {
  len = arr.length;
  term = arr[len -1];

  create({
    category: 'generic',
    name: term
  }, function (err, doc) {
      if (err)  {
        console.log(err);
      } else {
        console.log('success: ', term);
        console.log(len);

        if (len > 1) {
          var obj = arr.pop();
          saveBatch(arr);
        }

      }
  });
}

exports.all         = all;
exports.create      = create;
exports.saveBatch = saveBatch;











