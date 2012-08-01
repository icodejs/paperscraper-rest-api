var
webPage    = require('./webPage'),
searchTerm = require('./searchTerm');

exports.saveSearchTermBatch = function (req, res) {
  var arr = [
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

  searchTerm.saveBatch(arr);
  res.end('done');
};

exports.saveWebPageBatch = function (req, res) {
  var arr = [
    {
      url: "http://thepaperwall.com/wallpapers/sci-fi/big/",
      category: 'Sci-fi'
    }, {
      url: "http://thepaperwall.com/wallpapers/industrial/big/",
      category: 'Industrial'
    }, {
      url: "http://thepaperwall.com/wallpapers/architecture/big/",
      category: 'Architecture'
    }, {
      url: "http://thepaperwall.com/wallpapers/nature/big/",
      category: 'Nature'
    }, {
      url: "http://thepaperwall.com/wallpapers/cartoon_comic/big/",
      category: 'Cartoon / Comic'
    }, {
      url: "http://thepaperwall.com/wallpapers/cars/big/",
      category: 'Cars'
    }, {
      url: "http://thepaperwall.com/wallpapers/computer_tech/big/",
      category: 'Computer'
    }, {
      url: "http://thepaperwall.com/wallpapers/humor/big/",
      category: 'Humor'
    }, {
      url: "http://thepaperwall.com/wallpapers/sports/big/",
      category: 'Sports'
    }, {
      url: "http://thepaperwall.com/wallpapers/vintage_historical/big/",
      category: 'Vintage'
    }, {
      url: "http://thepaperwall.com/wallpapers/war_military/big/",
      category: 'War / Military'
    }, {
      url: "http://thepaperwall.com/wallpapers/animals/big/",
      category: 'Animals'
    }, {
      url: "http://thepaperwall.com/wallpapers/movies/big/",
      category: 'Movies'
    }, {
      url: "http://thepaperwall.com/wallpapers/television/big/",
      category: 'Television'
    }, {
      url: "http://thepaperwall.com/wallpapers/video_games/big/",
      category: 'Video Games'
    }, {
      url: "http://thepaperwall.com/wallpapers/big/",
      category: 'Big'
    }, {
      url: "http://thepaperwall.com/wallpapers/misc/big/",
      category: 'Misc'
    }, {
      url: "http://thepaperwall.com/wallpapers/digital_artwork/big/",
      category: 'Digital Artwork'
    }, {
      url: "http://thepaperwall.com/wallpapers/duel_monitor/big/",
      category: 'Dual Monitor'
    }, {
      url: "http://thepaperwall.com/wallpapers/fantasy/big/",
      category: 'Fantasy'
    }, {
      url: "http://thepaperwall.com/wallpapers/food_drink/big/",
      category: 'Food Drink'
    }, {
      url: "http://thepaperwall.com/wallpapers/informational/big/",
      category: 'Informational'
    }, {
      url: "http://thepaperwall.com/wallpapers/iphone_mobile/big/",
      category: 'iphone Mobile'
    }, {
      url: "http://thepaperwall.com/wallpapers/music/big/",
      category: 'Music'
    }, {
      url: "http://thepaperwall.com/wallpapers/people/big/",
      category: 'People'
    }, {
      url: "http://thepaperwall.com/wallpapers/quotes_worded/big/",
      category: 'Quotes Worded'
    }
  ];

  webPage.saveBatch(arr);
  res.end('done');
};


