
var
app        = require('express').createServer(),
url        = require('url'),
qs         = require('querystring'),
scraper    = require('./lib/scraper'),
webPage    = require('./lib/webPage'),
wallpaper  = require('./lib/wallpaper'),
searchTerm = require('./lib/searchTerm'),
dimension  = require('./lib/dimension'),
user       = require('./lib/user'),
common     = require('./lib/common');

app.get('/scrape/webPage/', function(req, res){
  scrapeWebPage(req, res);
});

// webPages
app.get('/load/webPages/', function(req, res){
  loadWebPages(req, res);
});

app.get('/save/webPage/', function(req, res){
  saveWebPage(req, res);
});

app.get('/save/batch/webPages/', function(req, res){
  common.saveWebPageBatch(req, res);
});

// wallpapers
app.get('/load/wallpapers/', function(req, res){
  loadWallpapers(req, res);
});

app.get('/save/wallpaper/', function(req, res){
  saveWallpaper(req, res);
});

// users
app.get('/load/users/', function(req, res){
  loadUsers(req, res);
});

app.get('/save/user/', function(req, res){
  saveUser(req, res);
});

// search terms
app.get('/save/batch/searchterms/', function(req, res){
  common.saveBatch(req, res);
});

app.get('/', function(req, res){
  res.end('welcome to paper scraper node library');
});

app.listen(5000);


function scrapeWebPage(req, res) {
  scraper.scrape({
    res: res,
    req: req,
    pageUrl: req.params.url,
    query: req.query,
    callback: function(err, obj) {
      res.contentType(obj.contentType);
      if (err) {
        //throw Error(err);
        console.log(err);
        res.end({error: err.toString()});
      }
      res.end(obj.output);
    }
  });
}

function saveWebPage(req, res) {
  var
  parsedUrl = url.parse(req.url, true),
  pathname  = parsedUrl.pathname,
  query     = parsedUrl.query,
  category  = query.category,
  _url      = query.url;

  if (!category || !_url)
    throw new Error('Jay Esco: One or more query string values are missing. Formate = "?category=test&url=http://www.icodejs.com"');

  webPage.create({
    category: category,
    url: _url
  }, function(err, page) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(page));
  });

  // this data needs to come from a post /get request from the server
  // e.g. http://localhost:5000/save/webpages/?category=test&url=http://www.test.com
}

function loadWebPages(req, res) {
  webPage.allJsonp({
    res: res,
    req: req,
    pageUrl: req.params.url,
    query: req.query,
    callback: function(err, obj) {
      res.contentType(obj.contentType);

      if (err) {
        console.log(err);
        var jsonpError = common.jsonpify({
          json       : {error: err.toString()},
          callbackId : obj.callbackId
        });
        res.end(jsonpError);
      }
      console.log(obj.output);
      res.end(obj.output);
    }
  });
}

function saveWallpaper(req, res) {
  var
  parsedUrl = url.parse(req.url, true),
  pathname  = parsedUrl.pathname,
  query     = parsedUrl.query;

  wallpaper.create({
    name        : query.name || '',
    filename    : query.filename || '',
    Description : query.Description || '',
    imageSrc    : query.imageSrc || '',
    originUrl   : query.originUrl || '',
    domain      : query.domain || '',
    fileSizeKB  : query.fileSizeKB || '',
    dimension   : query.dimension || '',
    width       : query.width || '',
    height      : query.height || '',
    altText     : query.altText || '',
    titleText   : query.titleText || '',
    fileType    : query.fileType || ''
  }, function(err, page) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(page));
  });

  // this data needs to come from a post /get request from the server
  // e.g. http://localhost:5000/save/wallpaper/?category=test&url=http://www.test.com
}

function loadWallpapers(req, res) {
  wallpaper.all(function(err, webPages) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(webPages));
  });
}

function saveUser(req, res) {
  var
  parsedUrl = url.parse(req.url, true),
  pathname  = parsedUrl.pathname,
  query     = parsedUrl.query;

  user.create({
    usernane       : query.username || '',
    email          : query.email || '',
    password       : query.password || '',
    dateRegistered : String(Date.now(), 10)
  }, function(err, user) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(user));
  });
}

function loadUsers(req, res) {
  user.all(function(err, users) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(users));
  });
}


console.log('listening at %s', 'http://localhost:5000');

// Notes
// *. Instead of throwing error, it may be better to start passing the error back to the browser as jsonp??
