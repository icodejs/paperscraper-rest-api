var
scraper = require('./lib/scraper'),
restify = require('restify'),
webPage = require('./lib/webPage');

function getImageData(req, res, next) {
  console.log('-----------------');

  scraper.scrape({
    res: res,
    req: req,
    pageUrl: req.params.url,
    query: req.query,
    callback: function(err, obj) {
      if (err) {
        throw Error(err);
      }

      res.send(obj.output);
      return next();
    }
  });
}

function saveWebPage(req, res, next) {
  // this data needs to come from a post /get request from the server
  webPage.create({
    category: 'animals',
    url: 'http://animals.com'
  }, function(err, page) {
    res.end(page);
    return next();
  });
}

function loadWebPages(req, res, next) {
  webPage.getWebPages(function(err, webPages) {
    if (err) {
      throw err;
    }
    res.send(webPages);
    return next();
  });
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('/scrape/page/', getImageData);
server.get('/load-web-pages/', loadWebPages);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
