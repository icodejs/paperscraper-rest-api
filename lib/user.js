
var
resourceful = require('resourceful'),
config      = require('./config');

var User = resourceful.define('user', function (id) {
  this.use('couchdb', {
    uri: config.db.user
  });

  this.string('_id');
  this.string('email');
  this.string('username');
  this.string('password');
  this.string('dateRegistered');
  this.timestamps();
});

function create(obj, callback) {
  obj._id = String(Date.now(), 10);
  User.create(obj, function (err, user) {
    if (err) return callback(err);
    return callback(null, user);
  });
}

function all(callback) {
  User.all(function (err, docs) {
    if (err) return callback(err);
    return callback(null, docs);
  });
}

exports.all    = all;
exports.create = create;