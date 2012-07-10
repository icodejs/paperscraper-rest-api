var
app     = require('express').createServer(),
scraper = require('./lib/scraper'),
webPage = require('./lib/webPage');

function getImageData(req, res) {
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

      res.end(obj.output);
    }
  });
}

function saveWebPage(req, res) {
  // this data needs to come from a post /get request from the server
  webPage.create({
    category: 'animals',
    url: 'http://animals.com'
  }, function(err, page) {
    res.end(page);
  });
}

function loadWebPages(req, res) {
  webPage.getWebPages(function(err, webPages) {
    if (err) {
      throw err;
    }

    res.end(JSON.stringify(webPages));
  });
}

app.get('/scrape/page/', function(req, res){
  getImageData(req, res);
});

app.get('/load-web-pages/', function(req, res){
  loadWebPages(req, res);
});

app.listen(5000);

console.log('listening at %s', 'http://localhost:5000');
