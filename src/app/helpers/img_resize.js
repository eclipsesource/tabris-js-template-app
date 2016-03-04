var googleResize = 'http://images1-focus-opensocial.googleusercontent.com/gadgets/proxy';
var weservResize = 'https://images.weserv.nl/';
var imgResizeService = require('./../../config.js').config.imgResizeService;

function resizeImageURLByWidth(url, width){
  var handler;
  var actualWidth = ( tabris.device.get("screenWidth") * tabris.device.get("scaleFactor") );
  if(!url || url.length === 0 ){
    return url;
  }
  handler = handlers[imgResizeService];
  if(!handler) { return url; }
  return handler(url,actualWidth);

}

var handlers = {
  google : function(url, actualWidth){
    return googleResize+'?url='+encodeURIComponent(url)+'&resize_w='+ ( actualWidth ) +'&container=focus';
  },
  weserv : function(url, actualWidth){
    var newUrl;
    if(url.indexOf('https://') === 0){
      newUrl = url.slice(8);
    }
    else if(url.indexOf('http://') === 0){
      newUrl = url.slice(7);
    }
    return weservResize+'?url='+encodeURIComponent(newUrl)+'&w='+ ( actualWidth );
  },
}


module.exports = {
  resizeImageURLByWidth: resizeImageURLByWidth
};
