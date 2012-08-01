
var
app        = require('express').createServer(),
url        = require('url'),
qs         = require('querystring'),
scraper    = require('./lib/scraper'),
webPage    = require('./lib/webPage'),
wallpaper  = require('./lib/wallpaper'),
searchTerm = require('./lib/searchTerm'),
dimension  = require('./lib/dimension'),
user       = require('./lib/user');

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
  createBatch(req, res);
});

app.get('/', function(req, res){
  res.end('hello world');
});

app.listen(5000);


function scrapeWebPage(req, res) {
  scraper.scrape({
    res: res,
    req: req,
    pageUrl: req.params.url,
    query: req.query,
    callback: function(err, obj) {
      if (err) throw Error(err);
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
  webPage.all(function(err, webPages) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end(JSON.stringify(webPages));
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
    dimension  : query.dimension || '',
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

function createBatch(req, res) {
  var search_terms = [
      'cityscape wallpaper',
      'marvel comics',
      'dc commics',
      'space wallpaper',
      'space stars wallpaper',
      'space planets wallpaper',
      'muscle cars',
      'tokyo japan city',
      'adult swim wallpaper',
      'thepaperwall cityscape wallpapers',
      'akira wallpaper',
      'high res background textures',
      'high res background wallpapers',
      'architectural photography wallpapers',
      'Street photography wallpapers',
      'macro photography wallpapers',
      'Aerial photography wallpapers',
      'Black and White photography wallpapers',
      'Night photography wallpapers',
      'dream-wallpaper.com',
      'flowers',
      'graffiti',
      'national geographic wallpaper'
  ];

  searchTerm.createBatch(search_terms);
  res.end('done');
}

console.log('listening at %s', 'http://localhost:5000');
