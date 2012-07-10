var app     = require('express').createServer(),
    url     = require('url'),
    qs      = require('querystring'),
    scraper = require('./lib/scraper'),
    webPage = require('./lib/webPage');

function getImageData(req, res) {
  scraper.scrape({
    res: res,
    req: req,
    pageUrl: req.params.url,
    query: req.query,
    callback: function(err, obj) {
      if (err)
        throw Error(err);

      res.end(obj.output);
    }
  });
}

function saveWebPage(req, res) {
  // this data needs to come from a post /get request from the server

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
    res.end(JSON.stringify(page));
  });
}

function loadWebPages(req, res) {
  webPage.getWebPages(function(err, webPages) {
    if (err)
      throw err;

    res.end(JSON.stringify(webPages));
  });
}

app.get('/scrape/page/', function(req, res){
  getImageData(req, res);
});

app.get('/load-web-pages/', function(req, res){
  loadWebPages(req, res);
});

app.get('/save-web-pages/', function(req, res){
  saveWebPage(req, res);
});

app.listen(5000);

console.log('listening at %s', 'http://localhost:5000');
