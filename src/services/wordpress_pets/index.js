/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/


var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;

function getItems(feedConfig){
	return new Promise(function(resolve, reject) {
		fetch( feedConfig.feed ).then(function( res ){
			return res.json();
		}).then(function( res ){
			var items = res;
			items.forEach(function(item){
				item.name = item.title;
				item.image = resizeImageURLByWidth(item.featured_image ? (item.featured_image.source || item.featured_image.guid)  : null );
			});
			resolve(items);
		}).catch(function (err){
			reject(err);
		});
	});
}



function getItemDetails(item) {
	return {
		type: 'url', // can be 'html', 'url', 'component'
		content: item.link
	}
}


module.exports = {
	getItems: getItems,
	getItemDetails: getItemDetails
};
