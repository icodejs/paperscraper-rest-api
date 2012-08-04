
/**
 *
 * Relax Images - Jay Esco (May 2012)
 * Server images in a REST type fashion
 * URL: http://nodejs.org/api/all.html#all_url
 * PATH: http://nodejs.org/api/all.html#all_path
 *
 */

var
jsdom  = require('jsdom'),
url    = require('url'),
qs     = require('querystring'),
_      = require('underscored'),
path   = require('path'),
fs     = require('fs'),
mime   = require('mime'),
common = require('./common'),
jquery = fs.readFileSync("./lib/jquery.js").toString();


function scrape(obj) {
  var
  req        = obj.req,
  parsedUrl  = url.parse(req.url, true),
  pathname   = parsedUrl.pathname,
  query      = obj.query || parsedUrl.query,
  pageUrl    = obj.pageUrl || query.url,
  method     = req.method,
  callbackId = query.callback && query.callback.length > 0 ? query.callback : '',
  isJsonp    = callbackId.length > 0;


  if (!pageUrl) {
    return obj.callback(new Error('Query URL is not present! Move this error handling to Restify'));
  }

  // add http if it isn't there already
  if (pageUrl.indexOf('http://') === -1) {
    pageUrl = 'http://' + pageUrl;
  }

  // add trailing slash if it isn't there already
  if (pageUrl.lastIndexOf('/') < 7) {
    pageUrl += '/';
  }

  jsdom.env({
    html: pageUrl,
    src: [jquery],
    done: function (errors, window) {
      if (errors) {
        return obj.callback(errors.toString());
        // errors must be returned with the correct json type
        // so add some kind of check for json and jsonp
      }

      if (window) {
        var
        i,
        len,
        $           = window.$,
        wallpapers  = [],
        err_text    = '',
        contentType = isJsonp ? mime.lookup('js') : mime.lookup('json');

        $('a, img').each(function () {
        // retrieve as much of this information as possible and store it in the db:
        // size
        // dimensions

        // do this on initial load of a new image. Once you have this info save
        // the string to the db, so that you will not have to do this again ???

          var
          img = {},
          that = $(this),
          src  = that.attr('href').toLowerCase() || that.attr('src').toLowerCase();

          if (src) {
            if (src.indexOf('jpg') > 0 || src.indexOf('png') > 0 || src.indexOf('gif') > 0 || src.indexOf('bmp') > 0) {

              // remove leading slash
              if (src.indexOf('/') === 0) {
                src = _.ltrim(src, '/');
              }

              wallpapers.push({
                url: src.indexOf('http') >= 0 ? src : pageUrl + src,
                altText: that.attr('alt') || '',
                name: that.attr('title') || that.text() || that.attr('alt') || '',
                pageUrl: pageUrl,
                fileName: path.basename(src),
                fileType: path.extname(src),
                domain: url.parse(pageUrl).hostname || ''
              });
            }
          }
        });

        common.jsonpify({
          json: JSON.stringify(wallpapers),
          isJsonp: isJsonp,
          callbackId: callbackId
        }, function (jsonOutput) {
          return obj.callback(null, {
            contentType: contentType,
            output: jsonOutput
          });
        });

      }
    }
  }); // end jsdom
} // end scrape

exports.scrape = scrape;