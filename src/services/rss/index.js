/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/

var feedHelpers = require('./feed_helpers');
var resizeImageURLByWidth = require('./../../helpers/img_resize').resizeImageURLByWidth;

function getItems(feedConfig){
	return new Promise(function(resolve, reject) {
		fetch( feedConfig.feed ).then(function( res ){
			return res.json();
		}).then(function( res ){
			var itemsProcessed = feedHelpers.sanitizeFeedItems (res.items , feedConfig.contentSanitizer);
			itemsProcessed.forEach(function(item){
				item.image = resizeImageURLByWidth ( feedHelpers.resolveImageForFeedItem(item ,feedConfig.imageResolver) );
			});
			resolve(itemsProcessed);
		}).catch(function (err){
			reject(err);
		});
	});
}

module.exports = {
	getItems: getItems
};
